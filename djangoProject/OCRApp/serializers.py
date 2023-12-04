from rest_framework import serializers
from .models import ScannedImage

class ScannedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScannedImage
        fields = ('id', 'image', 'created_at')