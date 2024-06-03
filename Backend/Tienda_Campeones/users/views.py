from rest_framework import viewsets
from rest_framework.request import Request
from users.models import Usuarios
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from Backend.Tienda_Campeones.users.usuarioapi.usuario_serializers import CustomUsuarioSerializer,CustomTokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUsuarioSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Usuarios.objects.all()
    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(is_active=True)
        return self.get_serializer().Meta.model.objects.filter(id_usuario=pk, is_active=True).first()

class LoginViewSet(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

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
                usuario_serializer = CustomUsuarioSerializer(usuario)
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
        if usuario.exists():
            RefreshToken.for_usuario(usuario)
            return Response({'message':'Sesion cerrada correctamente'},status=status.HTTP_200_OK)
        return Response({'error': 'No existe este mail'},status=status.HTTP_400_BAD_REQUEST)