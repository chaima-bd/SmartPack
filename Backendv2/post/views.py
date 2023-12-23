from .serializers import (
    PostSerializer,
    ProductSerializer,
    ProductOrderSerializer,
    OrderSerializer,
    LibrarySerializer,
    NotificationSerializer,
    CustomerSerializer,
    UserSerializer,
    UserLoginSerializer,
    UserRegisterSerializer
)
from .models import Post, Product, Order, Customer, ProductOrder, Library, Notification

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
import os
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# Auth
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from .validations import custom_validation, validate_email, validate_password

###ocr
from .ocr_util import perform_ocr, ask_gpt3_with_prompt, extract_and_create_dataframe



class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductOrderListCreateView(generics.ListCreateAPIView):
    queryset = ProductOrder.objects.all()
    serializer_class = ProductOrderSerializer

class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class LibraryListCreateView(generics.ListCreateAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer

class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


# Create your views here.

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        try:
            # Assuming 'image' is the key used to send the file from React Native
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
                }
                print("OCR DATA ", response_data)

                # Return the extracted data as JSON
                return JsonResponse(response_data, status=status.HTTP_201_CREATED)

            return Response("OCR processing failed", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            print(f"Error: {e}")
            return Response("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)



## AUTHENTICATION ###
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    ##
    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    ##
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
