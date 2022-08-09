import uuid
from django.db import models
from users.models import User


class Posts(models.Model):
    caption = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, null=False)
    image = models.ImageField(upload_to='posts')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.caption[:100]
