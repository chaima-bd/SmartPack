from .serializers import PostSerializer
from .models import Post
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import pytesseract
from PIL import Image
import uuid

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
            # Use KeywordExtractor from spaCy or similar library

            #from spacy import load
            #nlp = load("en_core_web_sm")
            #doc = nlp(text_content)
            #keywords = [key.text for key in doc.noun_chunks]
            # Generate a unique ID using uuid4()
            unique_id = str(uuid.uuid4().hex[:6])  # Change hex[:6] to adjust ID length
            # Combine the base title and unique ID for the final title
            title = unique_id

            post_instance.content = text_content
            post_instance.title = title
            post_instance.save()
            print(f"Extracted text from image: {text_content}")
            print(f"Generated title: {title}")
        except Exception as e:
            print(f"Error extracting text from image: {e}")
            import traceback
            traceback.print_exc()

            

