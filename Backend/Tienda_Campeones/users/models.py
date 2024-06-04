from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class Usuarios(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('CLIENTE', 'Cliente'),
        ('ADMIN', 'Admin'),
    ]
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=50)
    domicilio = models.CharField(max_length=150)
    rol = models.CharField(max_length=7, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido']

    class Meta:
        db_table = 'usuarios'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return f"Usuario ID: {self.id_usuario}, Nombre: {self.nombre}, Apellido: {self.apellido}, Email: {self.email}, Domicilio: {self.domicilio}, Rol: {self.rol}"

    def save(self, *args, **kwargs):
        if self.rol == 'ADMIN':
            self.is_staff = True
        else:
            self.is_staff = False
        super(Usuarios, self).save(*args, **kwargs)
        