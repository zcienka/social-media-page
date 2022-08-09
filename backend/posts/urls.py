from django.urls import path
from . import views


urlpatterns = [
    path('<int:pk>', views.post_list_create_view, name='posts'),
    path('', views.post_list_create_view, name='posts'),
]
