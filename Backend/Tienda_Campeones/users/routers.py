from rest_framework.routers import DefaultRouter
from users.views import UsuarioViewSet
from users.views import LoginViewSet

router = DefaultRouter()
router.register(r'usuarios',UsuarioViewSet,basename='usuarios')
#router.register(r'login', LoginViewSet,basename='login')
urlpatterns = router.urls