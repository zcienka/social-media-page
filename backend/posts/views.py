from rest_framework.response import Response
from .utils import get_posts, create_post
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/posts/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of posts'
        },
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
def get_all_posts(request):
    if request.method == 'GET':
        return get_posts(request)

    if request.method == 'POST':
        return create_post(request)
