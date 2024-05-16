from django.urls import path
from . import views

urlpatterns = [
    path('update-card-list/', views.update_card_list)
]
