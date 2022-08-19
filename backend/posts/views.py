from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
import base64
import uuid


class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        username = serializer.validated_data.get('username')
        user = get_user_model().objects.get(username=username)
        image = serializer.validated_data.get('image')
        format, imgstr = image.split(';base64,')

        filename = settings.MEDIA_URL + 'posts/{0}.png'.format(uuid.uuid4())

        with open('.' + filename, "wb+") as fh:
            fh.write(base64.b64decode(imgstr))

        serializer.save(user=user, image=filename)


post_list_create_view = PostListCreateAPIView.as_view()


class PostDetailUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_update(self, serializer):
        username = serializer.validated_data.get('username')
        user = get_user_model().objects.get(username=username)
        serializer.save(user=user)


post_detail_update_delete_view = PostDetailUpdateDestroyAPIView.as_view()


class CommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        username = serializer.validated_data.get('username')
        user = get_user_model().objects.get(username=username)
        serializer.save(user=user)


comment_list_create_view = CommentListCreateAPIView.as_view()


class CommentSpecificPostListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        username = serializer.validated_data.get('username')
        user = get_user_model().objects.get(username=username)
        serializer.save(user=user)

    def get_queryset(self, **kwargs):
        return super().get_queryset().filter(post=self.kwargs.get('post_id'))


comment_specific_post_create_view = CommentSpecificPostListCreateAPIView.as_view()


class CommentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_update(self, serializer):
        username = serializer.validated_data.get('username')
        user = get_user_model().objects.get(username=username)
        serializer.save(user=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_200_OK)


comment_detail_update_delete_view = CommentDetailAPIView.as_view()

