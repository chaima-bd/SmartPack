from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view(), name= 'posts_list'),
	path('products/', views.ProductListCreateView.as_view(), name= 'products_list'),
	path('customers/', views.CustomerListCreateView.as_view(), name= 'customers_list'),
	path('orders/', views.OrderListCreateView.as_view(), name= 'orders_list'),
	path('productorders/', views.ProductOrderListCreateView.as_view(), name= 'productorders_list'),
	path('library/', views.LibraryListCreateView.as_view(), name= 'library_list'),
	path('notification/', views.NotificationListCreateView.as_view(), name= 'notification_list'),

    path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),

]