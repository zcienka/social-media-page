import uuid
from django.db import models
# from django.contrib.auth import get_user_model
# from users.models import get_user_model()
from django.contrib.auth import get_user_model


from django.core.files.base import ContentFile

class Comment(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=False)
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, null=False, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    username = models.TextField(null=True, blank=True, editable=False)

    def __str__(self):
        return self.description[:100]


class Posts(models.Model):
    caption = models.TextField(null=True, blank=True)
    comment = models.ManyToManyField(Comment, related_name='post', blank=True)
    date = models.DateTimeField(auto_now_add=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, null=False, editable=False)
    # image = models.ImageField(upload_to='posts')
    image = models.TextField(null=True, blank=True)

    total_likes = models.PositiveIntegerField(default=0, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True,editable=False)
    username = models.TextField()
    users_like = models.ManyToManyField(get_user_model(),
                                        related_name='posts_liked',
                                        blank=True)

    def __str__(self):
        return self.caption[:100]


