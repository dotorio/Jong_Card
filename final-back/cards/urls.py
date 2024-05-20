from django.urls import path
from . import views

app_name='cards'
urlpatterns = [
    path('<str:username>/update-card-list/', views.update_card_list),
    path('<str:username>/<int:card_id>/likes_card_toggle/', views.likes_card_toggle),
    path('<int:card_id>/card_detail/', views.card_detail),
]
