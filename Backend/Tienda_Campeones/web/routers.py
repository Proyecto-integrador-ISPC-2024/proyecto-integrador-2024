from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.productoViews import ProductosViewSet
from .views.pedidoViews import PedidosViewSet

router = DefaultRouter()
router.register(r'productos', ProductosViewSet, basename='productos')
router.register(r'pedidos',PedidosViewSet, basename='pedidos')

urlpatterns = router.urls