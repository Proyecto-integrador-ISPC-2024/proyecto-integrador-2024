from rest_framework import serializers
from users.models import Usuarios
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id_usuario', 'nombre', 'apellido', 'email', 'domicilio','rol']

class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=6, write_only=True)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError(
                {'password':'Debe ingresar ambas contraseñas iguales'}
            )
        return data;

class UsuarioSerializer(serializers.ModelSerializer):
     class Meta:
        model = Usuarios
        fields = ['id_usuario', 'nombre', 'apellido', 'email', 'domicilio', 'password']
        extra_kwargs = {
            'password': {'write_only': True} 
        }
        
     def create(self, validated_data):
        usuario = Usuarios(**validated_data)
        usuario.set_password(validated_data['password'])
        usuario.rol = 'CLIENTE'  
        usuario.save()
        return usuario;
    
     def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password', None)
            instance.set_password(password)
    
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.email = validated_data.get('email', instance.email)
        instance.domicilio = validated_data.get('domicilio', instance.domicilio)
        
        instance.save()
        return instance

class UsuarioListSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Usuarios
        fields = ['nombre', 'apellido', 'email', 'domicilio','rol', 'is_active', 'is_staff']
        
        
class adminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id_usuario', 'nombre', 'apellido', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True} 
        }

    def create(self, validated_data):
        usuario = Usuarios(**validated_data)
        usuario.set_password(validated_data['password'])
        usuario.rol = 'ADMIN'  
        usuario.save()
        return usuario