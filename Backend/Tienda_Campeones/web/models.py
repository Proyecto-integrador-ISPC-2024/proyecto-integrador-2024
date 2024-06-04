from django.db import models
from users.models import Usuarios
from django.core.validators import MinValueValidator

# Create your models here.
class DetallesPedido(models.Model):
    id_detalle = models.AutoField(db_column='ID_detalle', primary_key=True) 
    id_pedido = models.ForeignKey('Pedidos', related_name='detalles', on_delete=models.CASCADE, db_column='ID_pedido')  
    id_producto = models.ForeignKey('Productos', models.DO_NOTHING, db_column='ID_producto')  
    id_talle= models.ForeignKey('Talles', models.DO_NOTHING, db_column='ID_talle')  
    cantidad = models.IntegerField(db_column='Cantidad')  
    subtotal = models.FloatField(db_column='Subtotal') 

    class Meta:
        managed = True
        db_table = 'detalles_pedido'
        verbose_name_plural = 'Detalles de pedidos'
        
    def __str__(self):
     return f"DETALLE DEL PEDIDO : ID: {self.id_detalle}, ID DEL PEDIDO: {self.id_pedido.id_pedido}, ID DEL PRODUCTO: {self.id_producto.id_producto},TALLE: {self.id_talle.id_talle}, Cantidad comprada: {self.cantidad}, Subtotal: {self.subtotal}"


class FormasDePago(models.Model):
    id_forma_de_pago = models.AutoField(db_column='ID_Forma_de_pago', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=150)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'formas_de_pago'
        verbose_name_plural = 'Formas de pago'
    
    def __str__(self):
        return f"ID_FORMA DE PAGO: {self.id_forma_de_pago}, Descripcion: {self.descripcion}"


class FormasDepagoPedidos(models.Model):
    id_forma_depago_pedidos = models.AutoField(db_column='ID_Forma_depago_Pedidos', primary_key=True) 
    id_pedido = models.ForeignKey('Pedidos', related_name='forma_de_pago', on_delete=models.CASCADE, db_column='ID_pedido')  
    id_forma_de_pago = models.ForeignKey(FormasDePago, models.DO_NOTHING, db_column='ID_forma_de_pago') 
    id_tarjeta = models.ForeignKey('Tarjetas', models.DO_NOTHING, db_column='ID_tarjeta', blank=True, null=True)         

    class Meta:
        managed = True
        db_table = 'formas_depago_pedidos'
        verbose_name_plural = 'Formas de pago de pedidos'
    def __str__(self):
        return f"ID: {self.id_forma_depago_pedidos}, ID_PEDIDO: {self.id_pedido.id_pedido}, ID_FORMA DE PAGO: {self.id_forma_de_pago.id_forma_de_pago}, ID_TARJETA: {self.id_tarjeta.id_tarjeta}"
        


class Pedidos(models.Model):
    ESTADO_CHOICES = [
        ('ACEPTADO', 'Aceptado'),
        ('CANCELADO', 'Cancelado'),
        ('ENVIADO', 'Enviado'),
    ]
    id_pedido = models.AutoField(db_column='ID_pedido', primary_key=True) 
    fecha = models.DateField()
    id_usuario = models.ForeignKey('users.Usuarios', models.DO_NOTHING, db_column='ID_usuario') 
    total = models.FloatField(db_column='Total')  
    estado = models.CharField(db_column='Estado', max_length=9 , choices=ESTADO_CHOICES)  

    class Meta:
        managed = True
        db_table = 'pedidos'
        verbose_name_plural = 'Pedidos'
    def __str__(self):
        return f"PEDIDO ID:{self.id_pedido}, Fecha: {self.fecha}, ID_usuario: {self.id_usuario.id_usuario}, Total: {self.total}, Estado:{self.estado})"
    


class Productos(models.Model):
    id_producto = models.AutoField(db_column='ID_Producto', primary_key=True)  
    nombre_producto = models.CharField(db_column='Nombre_producto', max_length=45)  
    precio = models.FloatField(db_column='Precio') 
    imagen = models.CharField(db_column='Imagen', max_length=255, blank=True, null=True) 
    class Meta:
        managed = True
        db_table = 'productos'
        verbose_name_plural = 'Productos'
    def __str__(self):
        return f"Producto ID: {self.id_producto}, Nombre del producto: {self.nombre_producto}, Precio: {self.precio},Imagen: {self.imagen}"
        


class ProductosTalles(models.Model):
    id_producto_talle = models.AutoField(db_column='ID_producto_talle', primary_key=True)  
    id_producto = models.ForeignKey(Productos, models.DO_NOTHING, db_column='ID_producto',  related_name='productos') 
    id_talle = models.ForeignKey('Talles', models.DO_NOTHING, db_column='ID_talle')  
    stock = models.IntegerField(db_column='Stock', validators=[MinValueValidator(0)]) 

    class Meta:
        managed = True
        db_table = 'productos_talles'
        verbose_name_plural = 'Productos-Talles'
    
    def __str__(self):
        return f"ID: {self.id_producto_talle}, Producto: {self.id_producto.nombre_producto}, Talle: {self.id_talle.talle}, Stock: {self.stock}"

class Talles(models.Model):
    id_talle = models.AutoField(db_column='ID_talle', primary_key=True)  
    talle = models.CharField(db_column='Talle', max_length=45)  

    class Meta:
        managed = True
        db_table = 'talles'
        verbose_name_plural = 'Talles'
    def __str__(self):
        return (f"ID: {self.id_talle}, TALLE: {self.talle}")


class Tarjetas(models.Model):
    id_tarjeta = models.AutoField(db_column='ID_Tarjeta', primary_key=True)  
    nombre_tarjeta = models.CharField(db_column='Nombre_tarjeta', unique=True, max_length=100) 

    class Meta:
        managed = True
        db_table = 'tarjetas'
        verbose_name_plural = 'Tarjetas'
    def __str__(self):
        return (f"ID: {self.id_tarjeta}, NOMBRE: {self.nombre_tarjeta}")


