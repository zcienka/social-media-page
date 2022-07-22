from rest_framework.serializers import ModelSerializer
from .models import Posts, Users


class PostSerializer(ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
