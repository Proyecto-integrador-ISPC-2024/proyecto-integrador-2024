from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from web.models import *
from users.models import *
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
 

        
class PedidosSerializer(serializers.ModelSerializer):
    detalles=DetallesPedidoSerializer (many=True)
    forma_de_pago=PedidosPaymentsSerializer(many=True)
    
    class Meta:
        model = Pedidos
        fields = ['id_pedido', 'id_usuario', 'total','detalles','forma_de_pago']
        
    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        #talle= validated_data.pop('talle')
        formaspago=validated_data.pop('forma_de_pago')
        
        validated_data['fecha'] = timezone.now().date()
        validated_data['estado'] = 'ACEPTADO'
        
         
        with transaction.atomic():
            pedido= Pedidos.objects.create(**validated_data)
        
            
            for detalle_data in detalles_data:
                talle= detalle_data['id_talle']
                producto_id = detalle_data['id_producto']
                cantidad = detalle_data['cantidad']
                
                 # Obtengo el stock del producto y el talle correspondiente para verificar la disponibilidad
                producto_talle = ProductosTalles.objects.filter(id_producto=producto_id, id_talle_id=talle.id_talle).first()
                if not producto_talle or producto_talle.stock < cantidad:
                    raise serializers.ValidationError(f"No hay suficiente stock para el producto con ID {producto_id}")
                
                print("el pedido es.............: ",pedido)
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
             descripcion_buscada = forma_pago_data['id_forma_de_pago'].descripcion  # Obtén la descripción de la forma de pago
        
            forma_pago = FormasDePago.objects.filter(descripcion=descripcion_buscada).first()
            print("la forma de pago es: ", forma_pago)
            print("la descripcion buscada es: ", descripcion_buscada)
            if not forma_pago:
                raise serializers.ValidationError(f"No se encontró la forma de pago '{descripcion_buscada}'")
            
            # Si la forma de pago es 'Credito', buscar el ID de la tarjeta
            id_tarjeta = None
            if descripcion_buscada == "Credito":
                nombre_tarjeta = detalle_data.get('nombre_tarjeta')
                if nombre_tarjeta:
                    tarjeta = Tarjetas.objects.filter(nombre=nombre_tarjeta).first()
                    if tarjeta:
                        id_tarjeta = tarjeta.id_tarjeta
            
            # Crear la relación de forma de pago y pedido
            FormasDepagoPedidos.objects.create(
                id_pedido=pedido,
                id_forma_de_pago=forma_pago,
                id_tarjeta=id_tarjeta
            )
        
            return pedido

    
class MetodoPagoListSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormasDePago
        fields = ('id_forma_de_pago', 'descripcion')
        
        
        
   
class CancelarPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedidos
        fields = ['id_pedido', 'estado']
        
    def delete(self, instance):
        instance.estado = 'CANCELADO'
        instance.save()
        return instance
    
    
    


class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallesPedido
        fields = '__all__'

class PedidoListSerializer(serializers.ModelSerializer):
    detalles = DetallePedidoSerializer(many=True, read_only=True)
    productos = serializers.SerializerMethodField()

    class Meta:
        model = Pedidos
        fields = ['id_pedido','fecha', 'total', 'id_usuario','estado', 'detalles', 'productos' ]

    def get_productos(self, obj):
        # Obtener los detalles de los pedidos
        detalles = obj.detalles.all()

        detalles_str = [str(detalle) for detalle in detalles]

        return detalles_str

