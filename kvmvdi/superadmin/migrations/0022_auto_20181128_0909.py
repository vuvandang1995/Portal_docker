# Generated by Django 2.1.2 on 2018-11-28 02:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('superadmin', '0021_sshkeys'),
    ]

    operations = [
        migrations.AddField(
            model_name='sshkeys',
            name='owner',
            field=models.ForeignKey(db_column='owner', default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='myuser',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='oders',
            name='server',
            field=models.CharField(max_length=255),
        ),
    ]
