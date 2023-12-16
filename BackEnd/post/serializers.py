from rest_framework import serializers
from .models import Post
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Now you can import pytesseract and use it in your script
from PIL import Image

class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        # Extract text from the image using Tesseract
        image = validated_data.get('image')
        if image:
            image_path = image.path
            text_content = self.extract_text_from_image(image_path)
            validated_data['content'] = text_content

            # Print the extracted text
            print(f"Extracted text from image: {text_content}")

        # Create the Post object
        post = super().create(validated_data)
        return post

    def extract_text_from_image(self, image_path):
        try:
            # Use pytesseract to extract text from the image
            image = Image.open(image_path)
            text_content = pytesseract.image_to_string(image)
            return text_content
        except Exception as e:
            print(f"Error extracting text from image: {e}")
            return ''
