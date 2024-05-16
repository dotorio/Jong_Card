from django.urls import path
from . import views

app_name='articles'
urlpatterns = [
    path('', views.article_list),
    path('<int:article_pk>/detail/', views.article_detail),
    path('<int:user_pk>/write/', views.article_create)
]