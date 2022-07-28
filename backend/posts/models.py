from django.db import models
import uuid


class Users(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    username = models.CharField(max_length=20)

    def __str__(self):
        return self.username


class Posts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    caption = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    username = models.ForeignKey(Users, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts')

    def __str__(self):
        return self.caption[:100]
