from rest_framework.response import Response
from .models import Posts, Users
from .serializers import PostSerializer, UserSerializer


def get_posts(request):
    posts = Posts.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


def create_post(request):
    data = request.data
    post = Posts.objects.create(body=data['body'])
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


def get_users(request):
    users = Users.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
