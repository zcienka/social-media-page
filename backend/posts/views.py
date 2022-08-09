from rest_framework import generics, permissions, authentication
from .serializers import PostSerializer
from .models import Posts


class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        user = serializer.validated_data.get('user')
        username = user.username
        serializer.save(username=username)


post_list_create_view = PostListCreateAPIView.as_view()
