from django.apps import AppConfig
from django.core.signals import request_finished


class PostsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'posts'

    def ready(self):
        from . import signals
        # request_finished.connect(signals.users_like_changed)

