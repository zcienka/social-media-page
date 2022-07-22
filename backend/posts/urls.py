from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('posts/', views.get_all_posts, name='posts'),
    path('users/', views.get_all_users, name='users'),
]
