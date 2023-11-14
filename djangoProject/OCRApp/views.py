from django.shortcuts import render
from django.http import HttpRequest
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MyModel
#from .serializers import MyModelSerializer
# class ImageUploadView(APIView):
#      def post(self, request, format=None):
#          title = request.data.get('title')
#          description = request.data.get('description')
#          image = request.data.get('image_url')

#          # Handle the image upload logic here and save it to MyModel

#          return Response({'message': 'Image uploaded successfully'}, status=status.HTTP_201_CREATED)


#def say_hello(request):
#    return HttpRequest('hello world')

from django.views.decorators.csrf import csrf_exempt
class ImageUploadView(APIView):
    @csrf_exempt
    def ImageUploadView(request):
        if request.method == 'POST':
            image = request.FILES.get('image')

            # Save the image to your database
            # Here is an example of how to save the image to the database:

            image_model = ImageModel(image=image)
            image_model.save()

            return HttpResponse('Image uploaded successfully')
        else:
            return HttpResponse('Invalid request')
