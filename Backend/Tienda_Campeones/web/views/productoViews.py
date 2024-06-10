from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from web.models import ProductosTalles,Productos,Talles
from web.Serializers.productos_serializers import *



class ProductosViewSet(viewsets.ModelViewSet):
   
    queryset = ProductosTalles.objects.all()
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'retrieve', 'destroy','create_talle']:
            self.permission_classes = [permissions.IsAdminUser]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'list':
            pais = self.request.query_params.get('pais', None)
            if pais:
                return ProductosDetallesSerializer
            return ListproductsSerializer
        elif self.action in ['update', 'partial_update', 'retrieve']:
            return ProductosTallesUpdateSerializer
        return ProductosTallescreateSerializer

    def get_queryset(self):
        queryset = self.queryset
        pais = self.request.query_params.get('pais', None)
        
        if self.action == 'list':
            if pais:
                queryset = queryset.filter(id_producto__nombre_producto__icontains=pais)
                unique_products = []
                seen_ids = set()
        
                for product in queryset:
                    if product.id_producto not in seen_ids:
                        unique_products.append(product)
                        seen_ids.add(product.id_producto)
                return unique_products
            else:
                return self.get_serializer().Meta.model.objects.all()
        return queryset   
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({'message': 'Producto actualizado correctamente.'}, status=status.HTTP_200_OK)
        
    def list(self, request, *args, **kwargs):
         serializer = self.get_serializer(self.get_queryset(), many=True) 
         return Response(serializer.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({'message': 'El producto no existe.'}, status=status.HTTP_404_NOT_FOUND)
        self.perform_destroy(instance)
        return Response({'message': 'Producto eliminado correctamente.'}, status=status.HTTP_200_OK)
     
     
    def perform_destroy(self, instance):
    # Llamo al metodo delete del serializador que ya tiene una logica de eliminacion
     if hasattr(self.get_serializer(), 'delete'):
        self.get_serializer().delete(instance)
     
     
    @action(detail=False, methods=['post'])   
    def create_talle(self,request):  
        serializer = TallesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Talle creado correctamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

