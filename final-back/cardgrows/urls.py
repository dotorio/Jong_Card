from django.urls import path
from . import views

urlpatterns = [
    path('<str:username>/create-card/', views.create_card),
]
