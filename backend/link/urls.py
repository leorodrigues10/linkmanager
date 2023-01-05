from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import LinkAPI

router = DefaultRouter()

router.register('links', LinkAPI, basename='links')

urlpatterns = router.urls
