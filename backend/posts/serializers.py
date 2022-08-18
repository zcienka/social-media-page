from rest_framework.serializers import ModelSerializer
from .models import Post, Comment
from rest_framework import serializers


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ['id',
                  'caption',
                  'comments',
                  'date',
                  'image',
                  'total_likes',
                  'user',
                  'username',
                  'users_like']


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id',
                  'date',
                  'description',
                  'username',
                  'user',
                  'post']
