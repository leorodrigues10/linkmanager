from rest_framework.routers import DefaultRouter
from .views import AuthAPI
router = DefaultRouter()
router.register('auth', AuthAPI, basename='auth')

urlpatterns = router.urls
