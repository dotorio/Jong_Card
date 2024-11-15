# Generated by Django 4.2.8 on 2024-05-19 22:33

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
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cardBigCategory', models.CharField(max_length=50)),
                ('cardSmallCategory', models.CharField(max_length=50)),
                ('cardCompany', models.CharField(max_length=50)),
                ('cardName', models.CharField(max_length=50)),
                ('annualFee', models.CharField(max_length=50)),
                ('site', models.TextField()),
                ('like_users', models.ManyToManyField(related_name='like_cards', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Benefit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('convenience_store', models.CharField(max_length=50)),
                ('telecom', models.CharField(max_length=50)),
                ('fuel', models.CharField(max_length=50)),
                ('OTT', models.CharField(max_length=50)),
                ('cafe', models.CharField(max_length=50)),
                ('food', models.CharField(max_length=50)),
                ('public_transport', models.CharField(max_length=50)),
                ('hospital', models.CharField(max_length=50)),
                ('movie', models.CharField(max_length=50)),
                ('online_shopping', models.CharField(max_length=50)),
                ('offline_shopping', models.CharField(max_length=50)),
                ('delivery', models.CharField(max_length=50)),
                ('details', models.TextField()),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='benefit', to='cards.card')),
            ],
        ),
    ]
