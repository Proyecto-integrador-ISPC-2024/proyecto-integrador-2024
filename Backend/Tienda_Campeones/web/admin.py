from django.contrib import admin
from .models import *


# Register your models here.
modelos = [Pedidos, FormasDepagoPedidos, Tarjetas, Productos, ProductosTalles, Talles, FormasDePago, DetallesPedido]


for modelo in modelos:
    if not admin.site.is_registered(modelo):
        admin.site.register(modelo)