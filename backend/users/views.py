from rest_framework import generics, permissions, authentication
from .serializers import UsersSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    authentication_classes = [authentication.TokenAuthentication]

    # def get_queryset(self):
    #
    #     return user.accounts.all()

    def perform_create(self, serializer):
        password = make_password(serializer.validated_data.get('password'))
        serializer.save(password=password)


user_list_create_view = UserListCreateAPIView.as_view()
