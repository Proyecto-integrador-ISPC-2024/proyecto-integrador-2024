from rest_framework import serializers
from users.models import Usuarios
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass

class CustomUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
            model = Usuarios
            fields = ['email','password']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        #fields = '__all__'
        fields = ['nombre','apellido','email','password']
        #extra_kwargs = {'password': {'write_only' : True}}

    def create(self,validated_data):
        #usuario = Usuarios(**validated_data)
        #usuario.set_password(validated_data['password'])
        #usuario.save()
        #return usuario
        return UsuarioSerializer.objects.create(**validated_data)
    
    def update(self,instance,validated_data):
        updated_usuario = super().update(instance,validated_data)
        #updated_usuario.set_password(validated_data['password'])
        #updated_usuario.save()
        password = validated_data.get('password')  #Verifica si el password esta
        if password:
            updated_usuario.set_password(password)
            updated_usuario.save()
        return updated_usuario
