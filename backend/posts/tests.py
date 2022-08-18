from rest_framework.test import APITestCase
from django.urls import reverse
from .models import Post, Comment
from rest_framework import status
from django.contrib.auth import get_user_model


class PostTests(APITestCase):
    def setUp(self):
        self.superuser = get_user_model().objects.create_superuser('john', 'john@snow.com', 'johnpassword')
        # self.client.login(username='john', password='johnpassword')

        self.post = Post.objects.create(
            caption='ads',
            image='../media/posts/jana-_4_17MF6-gw-unsplash.jpg',
            username='john',
        )

    def test_api_listview(self):
        response = self.client.get(reverse("posts"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.count(), 1)
        self.assertContains(response, self.post)


class CommentTests(APITestCase):
    def setUp(self):
        self.superuser = get_user_model().objects.create_superuser('john', 'john@snow.com', 'johnpassword')
        self.client.login(username='john', password='johnpassword')

        self.comment = Comment.objects.create(
            description='test',
            user=get_user_model().objects.get(username="john"),
        )

    def test_api_listview(self):
        response = self.client.get(reverse("comment"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Comment.objects.count(), 1)
        self.assertContains(response, self.comment)
