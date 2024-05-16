from django.db import models
from django.conf import settings

# Create your models here.
class Article(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="articles")
    title = models.CharField(max_length=50)
    content = models.TextField()