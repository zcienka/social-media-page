import uuid
from django.db import models
from django.contrib.auth import get_user_model


class Post(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, null=False, editable=False)
    caption = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True, editable=False)
    image = models.TextField(null=True, blank=True)
    total_likes = models.PositiveIntegerField(default=0, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True, editable=False)
    username = models.TextField()
    users_like = models.ManyToManyField(get_user_model(), related_name='posts_liked', blank=True)

    def __str__(self):
        return self.caption[:100]

    class Meta:
        ordering = ('-date',)


class Comment(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, null=False, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, editable=False)
    username = models.TextField(null=True, blank=True)
    post = models.ForeignKey(Post, related_name='comments', blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.description[:100]

    class Meta:
        ordering = ('date',)
