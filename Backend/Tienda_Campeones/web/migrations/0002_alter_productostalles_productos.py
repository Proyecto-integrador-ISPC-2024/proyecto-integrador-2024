# Generated by Django 4.2 on 2024-05-31 09:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productostalles',
            name='productos',
            field=models.ForeignKey(db_column='ID_producto', on_delete=django.db.models.deletion.DO_NOTHING, related_name='productostalles_set', to='web.productos'),
        ),
    ]
