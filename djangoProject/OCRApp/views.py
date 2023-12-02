from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#from .models import ImageModel  # Assuming your model is named 'ImageModel'

#class ImageUploadView(APIView):
#    @csrf_exempt
#    def post(self, request, *args, **kwargs):
#        if request.method == 'POST':
#            image = request.FILES.get('image')

            # Save the image to your database
            # Here is an example of how to save the image to the database:
    #        image_model = ImageModel(image=image)
     #       image_model.save()

     #       return Response({'message': 'Image uploaded successfully'}, status=status.HTTP_201_CREATED)
      #  else:
      #      return Response({'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import viewsets
from .models import ScannedImage
from .serializers import ScannedImageSerializer

class ScannedImageViewSet(viewsets.ModelViewSet):
    queryset = ScannedImage.objects.all()
    serializer_class = ScannedImageSerializer