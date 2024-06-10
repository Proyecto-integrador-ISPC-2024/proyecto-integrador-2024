from rest_framework import viewsets, permissions
from rest_framework.response import Response

from rest_framework import status
from rest_framework.decorators import action
from users.usuarioapi.usuario_serializers import *
from users.models import *



class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.AllowAny]
    
    
    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(is_active=True)
        return self.get_serializer().Meta.model.objects.filter(id_usuario=pk, is_active=True).first()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class AdminViewSet(viewsets.ModelViewSet):
    serializer_class = adminSerializer
    queryset = Usuarios.objects.all()
    permission_classes = [permissions.IsAdminUser]
    
    def get_serializer_class(self):
         if self.action == 'list':
            return UsuarioListSerializer
         return self.serializer_class
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.rol == 'ADMIN':
            if request.user.is_superuser:  
                instance.is_active = False
                instance.save()
                return Response({'mensaje': 'Usuario administrador desactivado correctamente.'}, status=status.HTTP_200_OK)
            else:
                return Response({'mensaje': 'No tienes permisos para desactivar a usuarios administradores.'}, status=status.HTTP_403_FORBIDDEN)
        elif instance.rol == 'CLIENTE':
            if request.user.rol == 'ADMIN':
                instance.is_active = False
                instance.save()
                return Response({'mensaje': 'Usuario cliente desactivado correctamente.'}, status=status.HTTP_200_OK)
            else:
                return Response({'mensaje': 'No tienes permisos para desactivar a usuarios clientes.'}, status=status.HTTP_403_FORBIDDEN)
        
    
    def update(self, request, *args, **kwargs):
     instance = self.get_object()
     if not instance:
        return Response({'mensaje': 'El usuario no existe.'}, status=status.HTTP_404_NOT_FOUND)
     if instance.id_usuario != request.user.id:
        return Response({'mensaje': 'No puede cambiar la contraseña de otros usuarios.'}, status=status.HTTP_403_FORBIDDEN)
     new_password = request.data.get('new_password')
     if not new_password:
        return Response({'mensaje': 'Se requiere una contraseña.'}, status=status.HTTP_400_BAD_REQUEST)

     instance.set_password(new_password)
     instance.save()
     return Response({'mensaje': 'La contraseña del usuario se actualizo correctamente.'}, status=status.HTTP_200_OK)
 
 
       