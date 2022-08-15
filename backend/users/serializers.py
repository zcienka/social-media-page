from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model


# from .models import User

class UsersSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'date_joined',
            'password',
            'slug',
            'username',
        ]


class UserSerializerBasic(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'slug',
            'username',
            'id',
        ]
