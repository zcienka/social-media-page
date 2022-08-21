from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.user_list_create_view, name='user_register'),
    path('<slug:username>/', views.user_detail_update_view, name='user_detail'),
    path('<slug:username>/delete', views.user_delete_view, name='user_delete'),
    path('<slug:username>/exists', views.user_exists_view, name='user_exist'),
    path('', views.user_list_create_view, name='user_register'),
]
