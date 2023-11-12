from django.shortcuts import render

# Create your views here.
from .models import MyModel
from .serializers import MyModelSerializer
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser

class MyModelViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.order_by('-creation_date')
    serializer_class = MyModelSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

from rest_framework import serializers
from .models import MyModel

class MyModelSerializer(serializers.ModelSerializer):

    creator = serializers.ReadOnlyField(source='creator.username')
    creator_id = serializers.ReadOnlyField(source='creator.id')
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = MyModel
        #fields = ['id', 'creator', 'creator_id', 'title', 'description', 'image_url']
        fields = ['id', 'title', 'description', 'image_url']
