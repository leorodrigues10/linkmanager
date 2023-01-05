from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .models import Link
from .serializers import LinkSerializer
from linksmanagment.response_handler import ResponseHandler


class LinkAPI(ViewSet):

    def list(self, request):
        try:
            links = Link.objects.all()
            serializer = LinkSerializer(links, many=True)
            return Response(ResponseHandler.success(serializer.data), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)


    def retrieve(self, request, pk):
        try:
            try:
                link = Link.objects.get(id=pk)
            except Link.DoesNotExist:
                return Response(ResponseHandler.not_found(), status.HTTP_404_NOT_FOUND)

            serializer = LinkSerializer(link)
            return Response(ResponseHandler.success(serializer.data), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_INTERNAL_SERVER_ERROR)


    def create(self, request):
        try:
            serializer = LinkSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(ResponseHandler.success(serializer.data), status.HTTP_201_CREATED)
            return Response(ResponseHandler.error(serializer.errors), status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_error)


    def update(self, request, pk):
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
            return Response(ResponseHandler.error(None), status.HTTP_500_error)


    def delete(self, request, pk):
        try:
            try:
                link = Link.objects.get(id=pk)
                link.delete()
            except Link.DoesNotExist:
                return Response(ResponseHandler.not_found(), status.HTTP_404_NOT_FOUND)

            return Response(ResponseHandler.success(None), status.HTTP_200_OK)
        except Exception as e:
            return Response(ResponseHandler.error(None), status.HTTP_500_error)
