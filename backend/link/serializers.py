from rest_framework.serializers import ModelSerializer
from .models import Link


class LinkSerializer(ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'title', 'url', 'created_at', 'updated_at']
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
            'id': {'read_only': True},
        }


