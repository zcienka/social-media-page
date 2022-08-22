from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    slug = models.SlugField(max_length=150,
                            blank=True,
                            editable=False)

