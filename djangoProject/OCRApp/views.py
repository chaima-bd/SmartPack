from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MyModel
from .serializers import MyModelSerializer


class ImageUploadView(APIView):
    def post(self, request, format=None):
        title = request.data.get('title')
        description = request.data.get('description')
        image = request.data.get('image_url')

        # Handle the image upload logic here and save it to MyModel

        return Response({'message': 'Image uploaded successfully'}, status=status.HTTP_201_CREATED)
