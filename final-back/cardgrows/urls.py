from django.urls import path
from . import views

urlpatterns = [
    path('<str:username>/create-card/', views.create_card),
    path('<str:username>/save-card/', views.save_card),
    path('<str:username>/get_card_grow/', views.get_card_grow),
]
