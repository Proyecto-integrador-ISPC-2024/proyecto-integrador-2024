from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from users.usuarioapi.usuario_serializers import *
from users.models import Usuarios

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuarios.objects.all()

    # def get_serializer_class(self):
    #     if self.action == 'list':
    #         UsuarioListSerializer
    #     UsuarioSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(is_active=True)
        return self.get_serializer().Meta.model.objects.filter(id_usuario=pk, is_active=True).first()
    
    # def list(self, request):
    #     users = self.get_queryset()
    #     users_serializer = self.list_serializer_class(users, many=True)
    #     return Response(users_serializer.data, status=status.HTTP_200_OK)