from rest_framework import generics, permissions, authentication
from .serializers import UsersSerializer, UserSerializerBasic
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.utils.text import slugify


class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UsersSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def perform_create(self, serializer):
        password = make_password(serializer.validated_data.get('password'))
        slug = slugify(serializer.validated_data.get('username'))
        serializer.save(password=password, slug=slug)
        # serializer.save()
        # username = serializer.validated_data.get('username')
        # serializer.save(slug=username)


user_list_create_view = UserListCreateAPIView.as_view()


class UserDetailAPIView(generics.RetrieveAPIView):
    # queryset = get_user_model().objects.values_list('username', flat=True)
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializerBasic
    lookup_field = 'username'


user_detail_view = UserDetailAPIView.as_view()
