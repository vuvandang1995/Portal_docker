# Generated by Django 2.1.3 on 2018-12-06 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('superadmin', '0027_auto_20181129_2144'),
    ]

    operations = [
        migrations.AddField(
            model_name='flavors',
            name='name',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='images',
            name='os',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]