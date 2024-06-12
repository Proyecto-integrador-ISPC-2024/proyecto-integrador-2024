
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions as permission
from users.models import Usuarios
from users.usuarioapi.usuario_serializers import *

class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [permission.AllowAny]

    def post(self,request,*args, **kwargs):
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        if not email or not password:
            return Response({'error': 'Campos obligatorios'}, status=status.HTTP_400_BAD_REQUEST)
        
        usuario =authenticate(email=email,
                           password=password)
        if usuario:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                usuario_serializer = UserSerializer(usuario)
                return Response({
                    'token': login_serializer.validated_data.get('access'),
                    'refresh_token': login_serializer.validated_data.get('refresh'),
                    'usuario': usuario_serializer.data,
                    'message': 'Inicio de sesión exitoso'
                }, status=status.HTTP_200_OK)
        
        return Response({'error': 'Mail o contraseña incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
    
class Logout(GenericAPIView):
    
     def post(self,request,*args,**kwargs):
        email = request.data.get('email', '')
        usuario = Usuarios.objects.filter(email=email).first()
        if usuario is not None:
            RefreshToken.for_user(usuario)
            return Response({'message':'Sesion cerrada correctamente'},status=status.HTTP_200_OK)
        return Response({'error': 'No existe este mail'},status=status.HTTP_400_BAD_REQUEST)