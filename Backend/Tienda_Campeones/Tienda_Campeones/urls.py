from django.contrib import admin
from django.urls import path,include
from users.views import Login,Logout
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from web.routers import router
from users.routers import router2
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('productos/',include('web.routers')),
    path('pedidos/',include('web.routers')),
    path('', include(router2.urls)),
    path('usuarios/', include('users.routers')),
    path('administrador/', include('users.routers')),
    path('logout/', Logout.as_view(), name = 'logout'),
    path('login/',Login.as_view(), name = 'login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]