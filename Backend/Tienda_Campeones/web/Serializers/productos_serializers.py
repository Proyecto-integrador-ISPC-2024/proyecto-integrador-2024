from rest_framework import serializers
from web.models import Productos, Talles, ProductosTalles

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'

class TallesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talles
        fields = '__all__'

#aqui utilizo serializadores anidados para la creacion de un producto
class ProductosTallescreateSerializer(serializers.ModelSerializer):
    productos = ProductosSerializer()  
    talle = serializers.StringRelatedField(source='talles')

    class Meta:
        model = ProductosTalles
        fields = '__all__'
        



class ProductosTallesListSerializer(serializers.ModelSerializer):
    producto = serializers.StringRelatedField(source='productos')
    talle = serializers.StringRelatedField(source='talles')

    class Meta:
        model = ProductosTalles
        fields = '__all__'