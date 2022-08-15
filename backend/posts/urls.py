from django.urls import path
from . import views


urlpatterns = [
    path('', views.post_list_create_view, name='posts'),
    # path('<uuid:pk>/', views.post_detail_view, name='posts_detail'),
    path('add-comment/', views.comment_list_create_view, name='comment'),
    path('comments/<uuid:pk>/', views.comment_detail_view, name='comment_detail'),
]
