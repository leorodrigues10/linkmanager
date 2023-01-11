import uuid
from django.contrib.auth.models import User
from django.db import models


class Link(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False)
    title = models.CharField(max_length=255, null=False, blank=False)
    url = models.CharField(max_length=2500, null=False, blank=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now=True)
