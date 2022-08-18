from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.user_list_create_view, name='user_register'),
    path('', views.user_list_create_view, name='user_register'),
    path('<slug:username>/', views.user_detail_update_delete_view, name='user_detail')
    # path('login/', view., name='login'),
]
