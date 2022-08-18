from django.urls import path
from . import views


urlpatterns = [
    path('', views.post_list_create_view, name='posts'),
    path('<uuid:pk>/update/', views.post_detail_update_delete_view, name='posts_update'),
    path('<uuid:pk>/', views.post_detail_update_delete_view, name='posts_detail'),
    path('<uuid:post_id>/comments/', views.comment_specific_post_create_view, name='comments'),
    path('comments/', views.comment_list_create_view, name='comments'),
    path('comment/<uuid:pk>/', views.comment_detail_update_delete_view, name='comment_detail'),
]
