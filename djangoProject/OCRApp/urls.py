#from django.urls import path 
#from . import views

#app_name = 'OCRApp'

#urlpatterns = [
  #path('/upload', views.say_hello),
  #path('', ), 
#]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScannedImageViewSet

router = DefaultRouter()
router.register(r'scanned-images', ScannedImageViewSet, basename='scanned-images')

urlpatterns = [
    path('api/', include(router.urls)),
]