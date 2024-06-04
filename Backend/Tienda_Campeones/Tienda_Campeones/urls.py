
from django.contrib import admin
from django.urls import path,include
from web.routers import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
   
    
]


