from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from web.Serializers.pedidos_serializers import *
from web.models import *
from rest_framework.decorators import action


class PedidosViewSet(viewsets.ModelViewSet):
    queryset = Pedidos.objects.all()
    serializer_class = PedidosSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action in ['list','retrieve']:
          return PedidosListSerializer
        return self.serializer_class
    
    def get_queryset(self):
         user = self.request.user
         if user.is_authenticated:
          if user.rol == 'ADMIN':
            return Pedidos.objects.filter(estado='ACEPTADO')
          elif user.rol == 'CLIENTE':
            return Pedidos.objects.filter(id_usuario=user.id)
    # Si el usuario no esta autenticado devuelvo un queryset vacio
         return Pedidos.objects.none()
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=False)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    
    
    
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({'Mensaje': 'Lo sentimos, no se encontro un pedido con esa informacion.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Pasar la instancia al serializer
        serializer = CancelarPedidoSerializer(instance)
        result=serializer.delete(instance)
        
        if result is None:
            return Response({'Mensaje': 'El pedido ya se encontraba cancelado.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Mensaje': 'Pedido cancelado correctamente.'}, status=status.HTTP_200_OK)
    
    
    # Metodo para marcar el pedido como enviado
    @action(detail=True, methods=['get'])
    def enviar(self, request, pk=None):
        instance = self.get_object()
        user =self.request.user
        if user.rol == 'ADMIN':
         if instance.estado == 'ENVIADO':
            return Response({'mensaje': 'Este pedido ya ha sido enviado.'}, status=status.HTTP_400_BAD_REQUEST)
         elif instance.estado == 'CANCELADO':
             return Response({'mensaje': 'El pedido esta cancelado,no puede enviarse.'}, status=status.HTTP_400_BAD_REQUEST)
         instance.estado = 'ENVIADO'
         instance.save()
         return Response({'message': 'Pedido marcado como enviado.'}, status=status.HTTP_200_OK)
        else:
            return Response({'mensaje': 'No tienes permisos para enviar pedidos.'}, status=status.HTTP_403_FORBIDDEN)
        
       

    
    @action(detail=False, methods=['get'])   
    def listar_metodopago(self, request):  
     formas_de_pago = FormasDePago.objects.all()
    
    # Obtener todas las tarjetas
     tarjetas = Tarjetas.objects.all()
     formas_de_pago_serializer = MetodoPagoListSerializer(formas_de_pago, many=True)
     tarjetas_serializer = TarjetaSerializer(tarjetas, many=True)
    
    # Combino los resultados en un diccionario
     data = {
        'formas_de_pago': formas_de_pago_serializer.data,
        'tarjetas': tarjetas_serializer.data
    }
     return Response(data, status=status.HTTP_200_OK)