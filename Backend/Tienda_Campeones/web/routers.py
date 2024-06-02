from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductosViewSet


router = DefaultRouter()
router.register(r'', ProductosViewSet, basename='productos')

urlpatterns = router.urls