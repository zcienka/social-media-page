from rest_framework.serializers import ModelSerializer
from .models import User


class UsersSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'password',
            'username',
            'date_joined',
        ]
