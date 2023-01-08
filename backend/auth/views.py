from rest_framework.decorators import api_view, action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .serializers import RegisterSerializer
from django.contrib.auth.models import User

class AuthAPI(ViewSet):

    @action(methods=['POST'],  detail=False)
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                serializer.data['username'],
                serializer.data['email'],
                serializer.data['password']
            )
            return Response({"message": "User created"})
        return Response(serializer.errors)
