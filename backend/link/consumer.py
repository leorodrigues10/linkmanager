import json
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_name = None
        self.username = None

    def connect(self):
        self.username = self.scope['url_route']['kwargs']['username']

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.username, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_name, self.channel_name
        )

    def receive_json(self, content, **kwargs):
        pass

    def send_event(self, event):
        self.send_json(event)

