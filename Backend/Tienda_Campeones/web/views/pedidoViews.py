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
    
    def get_serializer_class(self):
        if self.action in ['list','retrieve']:
            return PedidoListSerializer
        return PedidosSerializer
    
    
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=False)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    
    
    
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({'message': 'El pedido no existe.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Pasar la instancia al serializer
        serializer = CancelarPedidoSerializer(instance)
        
        
        # Llamar al método delete del serializer
        serializer.delete(instance)
        
        return Response({'message': 'Pedido cancelado correctamente.'}, status=status.HTTP_200_OK)
    
      
    def retrieve(self, request, *args, **kwargs):
      instance = self.get_object()
      serializer = self.get_serializer(instance)
      return Response(serializer.data)
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        
        # Filtrar solo los pedidos que estén en estado 'ACEPTADO' o 'ENVIADO'
        queryset = queryset.filter(estado__in=['ACEPTADO', 'ENVIADO'])
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
      
    
   
    
    
    @action(detail=False, methods=['get'])   
    def listar_metodopago(self,request):  
        queryset = FormasDePago.objects.all()
        serializer = metodopagoListSerializer(queryset, many=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def listar_detalle(self,request):
        queryset = DetallesPedido.objects.all()
        serializer=DetallesPedidoSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)