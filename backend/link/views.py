import requests
import re
from rest_framework.decorators import api_view, action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .models import Link
from .utils import simple_crawl, crawl_with_scroll, crawl_tags, send_message
from .serializers import LinkSerializer
from linksmanagment.response_handler import ResponseHandler
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema


class LinkAPI(ViewSet):
    permission_classes = [IsAuthenticated]
    @staticmethod
    @swagger_auto_schema(responses={200: LinkSerializer(many=True)})
    def list(request):
        try:
            user = User.objects.get(username=request.user)
            links = Link.objects.filter(user_id=user)
            serializer = LinkSerializer(links, many=True)
            return Response(ResponseHandler.success(serializer.data), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    @swagger_auto_schema(responses={200: LinkSerializer()})
    def retrieve(request, pk):
        try:
            try:
                link = Link.objects.get(id=pk)
            except Link.DoesNotExist:
                return Response(ResponseHandler.not_found(), status.HTTP_404_NOT_FOUND)

            serializer = LinkSerializer(link)
            return Response(ResponseHandler.success(serializer.data), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    @swagger_auto_schema(response_body=LinkSerializer)
    def create(request):
        try:
            serializer = LinkSerializer(data=request.data)
            if serializer.is_valid():
                user = User.objects.get(username=request.user)
                l = Link()
                l.url = serializer.data['url']
                l.title = serializer.data['title']
                l.user = user
                l.save()
                serializer = LinkSerializer(l)
                return Response(ResponseHandler.success(serializer.data), status.HTTP_201_CREATED)
            return Response(ResponseHandler.error(serializer.errors), status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    @swagger_auto_schema(response_body=LinkSerializer)
    def update(request, pk):
        try:
            try:
                link = Link.objects.get(id=pk)
            except Link.DoesNotExist:
                return Response(ResponseHandler.not_found(), status.HTTP_404_NOT_FOUND)

            serializer = LinkSerializer(link, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(ResponseHandler.success(serializer.data), status.HTTP_201_CREATED)
            return Response(ResponseHandler.error(serializer.errors), status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    @swagger_auto_schema()
    def destroy(request, pk):
        try:
            try:
                link = Link.objects.get(id=pk)
                link.delete()
            except Link.DoesNotExist:
                return Response(ResponseHandler.not_found(), status.HTTP_404_NOT_FOUND)

            return Response(ResponseHandler.success(None), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    @action(methods=['POST'], detail=False)
    def crawl(request):
        try:
            scroll = request.data['scroll']
            url = request.data['url']
            username = request.user
            if scroll:
                links = crawl_with_scroll(url, username)
            else:
                links = simple_crawl(url, username)

            user = User.objects.get(username=username)
            for link in links:
                if Link.objects.filter(url=link['url']).exists():
                    send_message('Link exists', username)
                else:
                    l = Link()
                    l.url = link['url']
                    l.title = link['title']
                    l.user = user
                    l.save()
                    send_message('Link saved', username)

            return Response(ResponseHandler.success(None), status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    @action(methods=['GET'], detail=False)
    def tags(request):
        try:
            tags = crawl_tags()
            return Response(ResponseHandler.success(tags), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    @action(methods=['DELETE'], detail=False)
    def delete_many(request):
        try:
            ids = request.data['ids']
            Link.objects.filter(id__in=ids).delete()
            return Response(ResponseHandler.success(None), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)
