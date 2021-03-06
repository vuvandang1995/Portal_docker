# Generated by Django 2.1.1 on 2018-09-13 03:38

from django.db import migrations, models
import django_cryptography.fields


class Migration(migrations.Migration):

    dependencies = [
        ('superadmin', '0002_server'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ops',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('ip', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('password', django_cryptography.fields.encrypt(models.CharField(max_length=50))),
                ('project', models.CharField(max_length=255)),
                ('userdomain', models.CharField(max_length=255)),
                ('projectdomain', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'ops',
                'managed': True,
            },
        ),
    ]
