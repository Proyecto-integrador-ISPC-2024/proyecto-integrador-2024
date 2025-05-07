from rest_framework.routers import DefaultRouter
from users.usuarioapi.UsuarioView import *

router2 = DefaultRouter()
router2.register(r'usuarios', UsuarioViewSet, basename='usuarios')
router2.register(r'administrador', AdminViewSet, basename='administrador')

urlpatterns = router2.urls
