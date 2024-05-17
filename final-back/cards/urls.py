from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_id>/update-card-list/', views.update_card_list),
    path('<int:user_id>/<int:card_id>/likes_card_toggle/', views.likes_card_toggle)
]
