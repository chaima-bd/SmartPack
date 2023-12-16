from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view(), name= 'posts_list'),
    #path('ocr_process/', views.PostView.as_view({'post': 'ocr_process'}), name='ocr_process')
    #path('ocr_process/', views.PostView.as_view, name='ocr_process'),
]