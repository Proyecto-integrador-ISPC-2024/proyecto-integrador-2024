from rest_framework import viewsets, permissions
from rest_framework.response import Response

from rest_framework import status
from rest_framework.decorators import action
from users.usuarioapi.usuario_serializers import *
from users.models import *

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
   
    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(is_active=True)
        return self.get_serializer().Meta.model.objects.filter(id_usuario=pk, is_active=True).first()
    
    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [permissions.AllowAny]
        elif self.request.method in ['PUT', 'PATCH', 'DELETE']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED);
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  
        instance = self.get_object()  
        if instance.id_usuario != request.user.id_usuario:
            return Response({'detail': 'No tienes permiso para modificar este usuario.'}, status=status.HTTP_403_FORBIDDEN)

        password_data = request.data.get('password_serializer', None)
        if password_data:
            password_serializer = PasswordSerializer(data=password_data)
            password_serializer.is_valid(raise_exception=True)
            instance.set_password(password_serializer.validated_data['password'])
            instance.save()  
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.id_usuario != request.user.id_usuario:
            return Response({'detail': 'No tienes permiso para inactivar este usuario.'}, status=status.HTTP_403_FORBIDDEN)
        instance.is_active = False
        instance.save()
        return Response({'detail': 'Usuario inactivado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
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
 
 
       