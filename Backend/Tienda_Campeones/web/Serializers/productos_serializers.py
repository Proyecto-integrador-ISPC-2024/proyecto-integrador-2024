from collections import defaultdict
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from web.models import Productos, Talles, ProductosTalles



class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'
    def __init__(self, *args, **kwargs):
        super(ProductosSerializer, self).__init__(*args, **kwargs)
        
        # Hace que los campos sean opcionales durante la actualización parcial
        if self.partial:
            for field in self.fields.values():
                field.required = False
    def update(self, instance, validated_data):
        if 'nombre_producto' in validated_data:
            instance.nombre_producto = validated_data['nombre_producto']
        if 'precio' in validated_data:
            instance.precio = validated_data['precio']
        instance.save()
        return instance

class TallesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talles
        fields = '__all__'
    
        
class ProductosTallesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductosTalles
        fields = '__all__'

class ProductosTallescreateSerializer(serializers.ModelSerializer):
    productos = ProductosSerializer(source='id_producto')
    talle = serializers.CharField(write_only=True)
    
    class Meta:
        model = ProductosTalles
        fields = ('id_producto_talle','productos', 'talle', 'stock')
    
    def validate_talle(self, value):
        if value == '' or value is None:
            raise serializers.ValidationError("Debe ingresar un  talle")
        return value
    
    def create(self, validated_data):
        # Extraer y validar los datos de cada objeto anidado
        producto_data = validated_data.pop('id_producto')
        talle = validated_data.pop('talle')
        stock = validated_data.pop('stock')
        try:
            talle_instance = Talles.objects.get(talle=talle)
        except Talles.DoesNotExist:
            raise serializers.ValidationError("No existe el talle especificado")

        # Validar y guardar la instancia de Producto
        producto_serializer = ProductosSerializer(data=producto_data)
        producto_serializer.is_valid(raise_exception=True)
        producto_instance = producto_serializer.save()
       
        return ProductosTalles.objects.create(
            id_producto=producto_instance,
            id_talle=talle_instance,
            stock=stock,
            **validated_data
        )
    
  
 #aqui hago un soft delete. en lugar de borrar el objeto, lo pongo en stock 0, para no permitir la compra   
    def delete(self, instance):

        instance.stock = 0
        instance.save()
   
   
   
 #este serializador es para utilizar cuando en la consulta me venga un params pais
class ProductosDetallesSerializer(serializers.ModelSerializer):
    productos=ProductosSerializer(source='id_producto')
    talles = serializers.SerializerMethodField()
    class Meta:
        model = ProductosTalles
        fields = ['id_producto_talle','productos', 'talles']
    def get_talles(self, obj):
        # Filtramos ProductosTalles para obtener los talles y stocks relacionados con el producto
        productos_talles = ProductosTalles.objects.filter(id_producto=obj.id_producto)
        talles_data = []
        for pt in productos_talles:
            talles_data.append({
                'id_talle': pt.id_talle.id_talle, 
                'talle': pt.id_talle.talle,
                'stock': pt.stock
            })
        return talles_data
   
#este voy a usar cuando quiera listar todos los objetos     
class ListproductsSerializer(serializers.ModelSerializer):
    productos=ProductosSerializer(source='id_producto')
    talles = serializers.SerializerMethodField()
    class Meta:
        model = ProductosTalles
        fields = ['id_producto_talle','productos', 'talles','stock']
        

    def get_talles(self, obj):  
     return {
            'id': obj.id_talle.id_talle,  
            'talle': obj.id_talle.talle
        }


    
    
class ProductosTallesUpdateSerializer(serializers.ModelSerializer):
    productos = ProductosSerializer(source='id_producto', partial=True)
    talle=serializers.CharField(source='id_talle.talle',read_only=True)
    
    class Meta:
        model = ProductosTalles
        fields = ('id_producto_talle', 'productos','talle','stock')
        extra_kwargs = {
            'productos': {'required': False},
            'stock': {'required': False},
        }

    def update(self, instance, validated_data):
        # Obtener los datos del producto anidado, si existen
        producto_data = validated_data.pop('id_producto', None)

        # Actualizar solo los campos proporcionados
        if 'stock' in validated_data:
            instance.stock = validated_data['stock']


        # Actualizar los datos del producto anidado, si existen
        if producto_data:
            producto_serializer = ProductosSerializer(instance.id_producto, data=producto_data, partial=True)
            producto_serializer.is_valid(raise_exception=True)
            producto_serializer.save()
        instance.save()
        return instance