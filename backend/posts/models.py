from django.db import models


class Posts(models.Model):
    body = models.TextField(null=True, blank=True)
    value = models.CharField(max_length=1000000)

    def __str__(self):
        return self.body
