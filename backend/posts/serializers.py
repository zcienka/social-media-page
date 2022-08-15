from rest_framework.serializers import ModelSerializer
from .models import Posts, Comment
from rest_framework import serializers


class PostSerializer(ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


