from django.db import models
from django.conf import settings

# Create your models here.
class CardGrow(models.Model):
    username = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='card_grow')
    level = models.IntegerField(default=1)
    exp = models.IntegerField(default=0)
    mission1 = models.BooleanField(default=False)
    mission2 = models.BooleanField(default=False)
    mission3 = models.BooleanField(default=False)
    mission4 = models.BooleanField(default=False)
    mission5 = models.BooleanField(default=False)