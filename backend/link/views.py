import requests
import re
from rest_framework.decorators import api_view, action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .models import Link
from .utils import simple_crawl, crawl_with_scroll, crawl_tags
from .serializers import LinkSerializer
from linksmanagment.response_handler import ResponseHandler


class LinkAPI(ViewSet):

    @staticmethod
    def list(request):
        try:
            links = Link.objects.all()
            serializer = LinkSerializer(links, many=True)
            return Response(ResponseHandler.success(serializer.data), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
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
    def create(request):
        try:
            serializer = LinkSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(ResponseHandler.success(serializer.data), status.HTTP_201_CREATED)
            return Response(ResponseHandler.error(serializer.errors), status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
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
    def delete(request, pk):
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
            
            if request.data['crawl_with_scroll']:
                links = crawl_with_scroll('https://dev.to/t/security')
            else:
                links = simple_crawl('https://dev.to/t/security')
            return Response(ResponseHandler.success(links), status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    @action(methods=['POST'], detail=False)
    def tags(request):
        try:
            tags = crawl_tags()
            return Response(ResponseHandler.success(tags), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)

