from django.db import models

# Create your models here.
class DetallesPedido(models.Model):
    id_detalle = models.AutoField(db_column='ID_detalle', primary_key=True)  # Field name made lowercase.
    id_pedido = models.ForeignKey('Pedidos', models.DO_NOTHING, db_column='ID_pedido')  # Field name made lowercase.
    id_producto = models.ForeignKey('Productos', models.DO_NOTHING, db_column='ID_producto')  # Field name made lowercase.
    id_talle = models.ForeignKey('Talles', models.DO_NOTHING, db_column='ID_talle')  # Field name made lowercase.
    cantidad = models.IntegerField(db_column='Cantidad')  # Field name made lowercase.
    subtotal = models.FloatField(db_column='Subtotal')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'detalles_pedido'
        verbose_name_plural = 'Detalles de pedidos'
        
    def __str__(self):
     return f"DETALLE DEL PEDIDO : ID: {self.id_detalle}, ID DEL PEDIDO: {self.id_pedido_id}, ID DEL PRODUCTO: {self.id_producto_id}, Cantidad comprada: {self.cantidad}, Subtotal: {self.subtotal}"


class FormasDePago(models.Model):
    id_forma_de_pago = models.AutoField(db_column='ID_Forma_de_pago', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=150)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'formas_de_pago'
        verbose_name_plural = 'Formas de pago'
    
    def __str__(self):
        return f"ID_FORMA DE PAGO: {self.id_forma_de_pago}, Descripcion: {self.descripcion}"


class FormasDepagoPedidos(models.Model):
    id_forma_depago_pedidos = models.AutoField(db_column='ID_Forma_depago_Pedidos', primary_key=True)  # Field name made lowercase.
    id_pedido = models.ForeignKey('Pedidos', models.DO_NOTHING, db_column='ID_pedido')  # Field name made lowercase.
    id_forma_de_pago = models.ForeignKey(FormasDePago, models.DO_NOTHING, db_column='ID_forma_de_pago')  # Field name made lowercase.
    id_tarjeta = models.ForeignKey('Tarjetas', models.DO_NOTHING, db_column='ID_tarjeta', blank=True, null=True)  # Field name made lowercase.       

    class Meta:
        managed = False
        db_table = 'formas_depago_pedidos'
        verbose_name_plural = 'Formas de pago de pedidos'
    def __str__(self):
        return f"ID: {self.id_forma_depago_pedidos}, ID_PEDIDO: {self.id_pedido_id}, ID_FORMA DE PAGO: {self.id_forma_de_pago}, ID_TARJETA: {self.id_tarjeta}"
        


class Pedidos(models.Model):
    id_pedido = models.AutoField(db_column='ID_pedido', primary_key=True)  # Field name made lowercase.
    fecha = models.DateField()
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='ID_usuario')  # Field name made lowercase.
    total = models.FloatField(db_column='Total')  # Field name made lowercase.
    estado = models.CharField(db_column='Estado', max_length=9)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'pedidos'
        verbose_name_plural = 'Pedidos'
    def __str__(self):
        return f"PEDIDO ID:{self.id_pedido}, Fecha: {self.fecha}, ID_usuario: {self.id_usuario_id}, Total: {self.total}, Estado:{self.estado})"
    


class Productos(models.Model):
    id_producto = models.AutoField(db_column='ID_Producto', primary_key=True)  # Field name made lowercase.
    nombre_producto = models.CharField(db_column='Nombre_producto', max_length=45)  # Field name made lowercase.
    precio = models.FloatField(db_column='Precio')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'productos'
        verbose_name_plural = 'Productos'
    def __str__(self):
        return f"Producto ID: {self.id_producto}, Nombre del producto: {self.nombre_producto}, Precio: {self.precio})"
        


class ProductosTalles(models.Model):
    id_producto_talle = models.AutoField(db_column='ID_producto_talle', primary_key=True)  # Field name made lowercase.
    id_producto = models.ForeignKey(Productos, models.DO_NOTHING, db_column='ID_producto')  # Field name made lowercase.
    id_talle = models.ForeignKey('Talles', models.DO_NOTHING, db_column='ID_talle')  # Field name made lowercase.
    stock = models.IntegerField(db_column='Stock')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'productos_talles'
        verbose_name_plural = 'Productos-Talles'
    def __str__(self):
        return f"ID: {self.id_producto_talle}, ID_PRODUCTO: {self.id_producto_id}, ID_TALLE: {self.id_talle}, STOCK: {self.stock}"


class Talles(models.Model):
    id_talle = models.AutoField(db_column='ID_talle', primary_key=True)  # Field name made lowercase.
    talle = models.CharField(db_column='Talle', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'talles'
        verbose_name_plural = 'Talles'
    def __str__(self):
        return (f"ID: {self.id_talle}, TALLE: {self.talle}")


class Tarjetas(models.Model):
    id_tarjeta = models.AutoField(db_column='ID_Tarjeta', primary_key=True)  # Field name made lowercase.
    nombre_tarjeta = models.CharField(db_column='Nombre_tarjeta', unique=True, max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tarjetas'
        verbose_name_plural = 'Tarjetas'
    def __str__(self):
        return (f"ID: {self.id_tarjeta}, NOMBRE: {self.nombre_tarjeta}")


class Usuarios(models.Model):
    id_usuario = models.AutoField(db_column='ID_usuario', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50)  # Field name made lowercase.
    apellido = models.CharField(db_column='Apellido', max_length=50)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True, max_length=50)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=120)  # Field name made lowercase.
    domicilio = models.CharField(db_column='Domicilio', max_length=150)  # Field name made lowercase.
    rol = models.CharField(max_length=7)

    class Meta:
        managed = False
        db_table = 'usuarios'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
     return f"Usuario ID: {self.id_usuario}, Nombre: {self.nombre}, Apellido: {self.apellido}, Email: {self.email}, Domicilio: {self.domicilio}, Rol: {self.rol})"