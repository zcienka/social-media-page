from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UsersSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'date_joined',
            'password',
            'slug',
            'username',
            'posts_liked',
        ]


class UserSerializerBasic(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'slug',
            'username',
            'id',
            'posts_liked',
        ]


class UserExistsSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'username',
        ]
