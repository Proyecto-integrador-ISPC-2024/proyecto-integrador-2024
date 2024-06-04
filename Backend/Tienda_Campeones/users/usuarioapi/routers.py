from rest_framework.routers import DefaultRouter
from users.usuarioapi.api import UsuarioViewSet

router = DefaultRouter()
router.register(r'',UsuarioViewSet,basename='usuarios')
#router.register(r'login', LoginViewSet,basename='login')
urlpatterns = router.urls