from .serializers import PostSerializer
from .models import Post
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
import os
from django.http import JsonResponse


###ocr
from .ocr_util import perform_ocr, ask_gpt3_with_prompt, extract_and_create_dataframe

# Create your views here.

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        try:
            #posts_serializer = PostSerializer(data=request.data)
            #if posts_serializer.is_valid():
            #    posts_serializer.save()
             #Assuming 'image' is the key used to send the file from React Native
            image_file = request.data.get('image')

            if not image_file:
                return Response("No image provided", status=status.HTTP_400_BAD_REQUEST)

            # Save the image temporarily (for debugging purposes)
            with open('temp_image.jpg', 'wb') as temp_file:
                temp_file.write(image_file.read())

            # Perform OCR on the uploaded image
            extracted_text = perform_ocr('temp_image.jpg')

            # Example prompt
            prompt = "Extrait la liste des fournitures et de leurs quantités à partir du texte suivant, puis présente les résultats sous la forme d'une liste avec chaque fourniture suivie de sa quantité. Assure-toi d'inclure uniquement les fournitures et leurs quantités dans la liste de sortie. la liste doit contenir les éléments et la quantité le séparateur entre les éléments doit être ; comme ça output de l'assistant:[element1 5 ,element2 3,element3 8,element4 7]"
            text = f"{prompt}\n\n voici le text: \n\n{extracted_text}"

            # Get GPT-3 response
            gpt3_response = ask_gpt3_with_prompt(text)

            if gpt3_response is not None:
                # Extract and create DataFrame
                commande_df = extract_and_create_dataframe(gpt3_response)
                commande_df = commande_df.dropna()

                # Return the extracted data as JSON along with OCR data
                response_data = {
                    'ocrData': commande_df.to_dict(orient='records'),
                    'extractedText': extracted_text,  # Optional: Include raw extracted text
                }

                # Return the extracted data as JSON
                return JsonResponse(response_data, status=status.HTTP_201_CREATED)

            return Response("OCR processing failed", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            print(f"Error: {e}")
            return Response("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # def post(self, request, *args, **kwargs):
    #     posts_serializer = PostSerializer(data=request.data)
    #     if posts_serializer.is_valid():
    #         posts_serializer.save()
    #         return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         print('error', posts_serializer.errors)
    #         return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


