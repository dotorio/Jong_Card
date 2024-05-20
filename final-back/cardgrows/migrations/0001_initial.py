# Generated by Django 4.2.8 on 2024-05-20 15:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CardGrow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField(default=1)),
                ('exp', models.IntegerField(default=0)),
                ('mission1', models.BooleanField(default=False)),
                ('mission2', models.BooleanField(default=False)),
                ('mission3', models.BooleanField(default=False)),
                ('mission4', models.BooleanField(default=False)),
                ('mission5', models.BooleanField(default=False)),
                ('missionCount3', models.IntegerField(default=0)),
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='card_grow', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
