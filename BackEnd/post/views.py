from .serializers import PostSerializer
from .models import Post
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        print("Inside post method")
        posts_serializer = PostSerializer(data=request.data)
        print("After creating serializer")
        if posts_serializer.is_valid():
            post_instance = posts_serializer.save()
            print("After saving post instance")

            # Call a method to extract text and update the post instance
            self.extract_text_from_image(post_instance)

            # Serialize the updated post instance
            updated_serializer = PostSerializer(post_instance)
            return Response(updated_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def extract_text_from_image(self, post_instance):
        image_path = post_instance.image.path
        try:
            image = Image.open(image_path)
            text_content = pytesseract.image_to_string(image)
            post_instance.content = text_content
            post_instance.save()
            print(f"Extracted text from image: {text_content}")
        except Exception as e:
            print(f"Error extracting text from image: {e}")
            import traceback
            traceback.print_exc()
            

