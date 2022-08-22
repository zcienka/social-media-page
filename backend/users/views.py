from rest_framework import generics, permissions, authentication
from .serializers import UsersSerializer, UserSerializerBasic, UserExistsSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UsersSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def perform_create(self, serializer):
        password = make_password(serializer.validated_data.get('password'))
        slug = slugify(serializer.validated_data.get('username'))
        serializer.save(password=password, slug=slug)


user_list_create_view = UserListCreateAPIView.as_view()


class UserDetailUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializerBasic
    lookup_field = 'username'


user_detail_update_view = UserDetailUpdateAPIView.as_view()


class UserDeleteAPIView(generics.DestroyAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializerBasic
    lookup_field = 'username'


user_delete_view = UserDeleteAPIView.as_view()


class UserExistAPIView(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserExistsSerializer
    lookup_field = 'username'


user_exists_view = UserExistAPIView.as_view()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
