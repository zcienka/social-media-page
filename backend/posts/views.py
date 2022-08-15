from rest_framework import generics
from .serializers import PostSerializer, CommentSerializer
from .models import Posts, Comment
from django.contrib.auth import get_user_model


class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        username = serializer.validated_data.get('username')
        user = get_user_model().objects.get(username=username)
        serializer.save(user=user)


post_list_create_view = PostListCreateAPIView.as_view()


class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer


post_detail_view = PostDetailAPIView.as_view()


class CommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


comment_list_create_view = CommentListCreateAPIView.as_view()


class CommentDetailAPIView(generics.RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


comment_detail_view = CommentDetailAPIView.as_view()
