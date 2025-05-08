from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from web.models import *
from users.models import *
from web.Serializers.productos_serializers import ProductosSerializer
from django.db import transaction


class TarjetaSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Tarjetas    
        fields = '__all__'
        
class FormaPagoSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormasDePago
        fields = '__all__'  
        
class DetallesPedidoSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetallesPedido
        fields = ['id_producto','id_talle', 'cantidad','subtotal' ]
        
class PedidosPaymentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormasDepagoPedidos
        fields = [ 'id_forma_de_pago', 'id_tarjeta']
 
class DescripcionpagoSerializer(serializers.ModelSerializer):
    forma_de_pago_descripcion = serializers.CharField(source='id_forma_de_pago.descripcion', read_only=True)
    tarjeta_nombre = serializers.CharField(source='id_tarjeta.nombre_tarjeta', read_only=True, required=False)
    class Meta:
        model = FormasDepagoPedidos
        fields = ['forma_de_pago_descripcion','tarjeta_nombre']
           
class PedidosSerializer(serializers.ModelSerializer):
    detalles=DetallesPedidoSerializer (many=True)
    forma_de_pago=PedidosPaymentsSerializer(many=True)
    
    class Meta:
        model = Pedidos
        fields = ['id_pedido', 'id_usuario', 'total','detalles','forma_de_pago']
        
    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        formaspago=validated_data.pop('forma_de_pago')
        
        validated_data['fecha'] = timezone.now().date()
        validated_data['estado'] = 'ACEPTADO'
        
         
        with transaction.atomic():
            pedido= Pedidos.objects.create(**validated_data)
            
            
            for detalle_data in detalles_data:
                talle= detalle_data['id_talle']
                producto_id = detalle_data['id_producto']
                cantidad = detalle_data['cantidad']
                producto_talle = ProductosTalles.objects.filter(id_producto=producto_id, id_talle_id=talle.id_talle).first()
                if not producto_talle or producto_talle.stock < cantidad:
                    raise serializers.ValidationError(f"Lo sentimos,No hay suficiente stock para este producto con el talle '{talle.talle}'.")
                
                DetallesPedido.objects.create(
                    id_pedido=pedido,
                    id_producto=producto_id,
                    cantidad=cantidad,
                    subtotal=detalle_data['subtotal'],
                    id_talle=talle
                )
                producto_talle = ProductosTalles.objects.get(id_producto=producto_id, id_talle=talle)
                print(f"el producto talle es {producto_talle}")
                producto_talle.stock -= cantidad
                producto_talle.save()
                
            for forma_pago_data in formaspago:
                forma_pago = forma_pago_data['id_forma_de_pago'] 
                id_forma_de_pago = forma_pago.id_forma_de_pago  
                
                id_tarjeta = None
                if forma_pago.descripcion.lower() == 'credito': 
                    id_tarjeta_data = forma_pago_data.get('id_tarjeta', None)
                    if id_tarjeta_data:
                        id_tarjeta = Tarjetas.objects.get(id_tarjeta=id_tarjeta_data.id_tarjeta)
                FormasDepagoPedidos.objects.create(
                    id_pedido=pedido,
                    id_forma_de_pago_id=id_forma_de_pago, 
                    id_tarjeta=id_tarjeta
                )
        return pedido
    
class MetodoPagoListSerializer(serializers.ModelSerializer):
    Tarjetas = TarjetaSerializer(read_only=True, many=True)

    class Meta:
        model = FormasDePago
        fields = ('id_forma_de_pago', 'descripcion', 'Tarjetas')
        
        
        
   
class CancelarPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedidos
        fields = ['id_pedido', 'estado']
        
    def delete(self, instance):
        
        if instance.estado == 'CANCELADO':
            return None
        instance.estado = 'CANCELADO'
        instance.save()
        
    
        detalles = DetallesPedido.objects.filter(id_pedido=instance.id_pedido)
        
        # defino una lista vacia para almacenar los detalles de pedidos y le voy a agregando los detalles del pedido
        detalles_lista = []
        
        for detalle in detalles:
            detalles_lista.append({
                'id_producto': detalle.id_producto,
                'id_talle': detalle.id_talle,
                'cantidad': detalle.cantidad
            })
        
        # una vez que tengo los detalles de pedidos y la cantidad de cada producto comprado, actualizo el stock.
        for detalle in detalles_lista:
            producto_talle = ProductosTalles.objects.get(id_producto=detalle['id_producto'], id_talle=detalle['id_talle'])
            producto_talle.stock += detalle['cantidad']
            producto_talle.save()
        
        return instance
    
    
    
    
class ProductodetailSerializer(serializers.ModelSerializer):
     producto = serializers.SerializerMethodField()
     class Meta:
        model = DetallesPedido
        fields = ('id_talle','cantidad','subtotal','producto')
     def get_producto(self, obj):
             producto= obj.id_producto
             return ProductosSerializer(producto).data


class PedidosListSerializer(serializers.ModelSerializer):
    forma_de_pago=DescripcionpagoSerializer(many=True, read_only=True)
    tarjeta=TarjetaSerializer(many=True, read_only=True)
    detalles = ProductodetailSerializer(many=True, read_only=True)
    class Meta:
        model = Pedidos
        fields = ( 'id_pedido', 'fecha', 'total', 'id_usuario','estado', 'detalles','forma_de_pago','tarjeta') 

