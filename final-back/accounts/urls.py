from django.urls import path
from . import views

app_name='user'
urlpatterns = [
    path('', views.index),
    path('<str:username>/info/', views.user_info),
    path('<str:username>/update/', views.update),

]