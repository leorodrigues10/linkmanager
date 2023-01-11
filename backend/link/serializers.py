from rest_framework.serializers import ModelSerializer
from .models import Link


class LinkSerializer(ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True},
        }


