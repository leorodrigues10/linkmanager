import json
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

class ChatConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.username = self.scope['url_route']['kwargs']['username']
        self.room_name = 'room'

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

    def welcome(self, event):
        self.send_json({
            "message": f"Welcome to the group {event['user']}"
        })

    def broadcast_welcome(self, event):
        self.send_json({
            "message": f"{event['user']} join to the chat, say hi"
        })


    def get_links(self, event):
        self.send_json(event)

