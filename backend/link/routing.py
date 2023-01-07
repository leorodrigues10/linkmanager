from django.urls import re_path
from .consumer import ChatConsumer

websocket_urlpatterns = [
    re_path(r"ws/(?P<username>\w+)/$", ChatConsumer.as_asgi())
]
