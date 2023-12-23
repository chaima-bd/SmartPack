from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey



# Create your models here.

## User manager ADMIN DJANGO
class AppUserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
        
    def create_superuser(self, username, email=None, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        user = self.create_user(username,email, password)
        user.is_superuser = True
        user.save()
        return user

##LibraryEmploye DASHBOARD
class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    is_admin = models.BooleanField(default=True)
    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['username']
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()

    @property
    def is_staff(self):
        return self.is_admin

    def __str__(self):
        return self.username

##CUSTOMER MOBILE APP
class Customer(models.Model):
    user_id = models.AutoField(primary_key=True, default=0)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.user_id)  # Convert user_id to string

class Post(models.Model):
    title = models.CharField(blank=True, max_length=100)
    content = models.TextField(blank=True)
    image = models.ImageField(blank=True, upload_to='post_images')
    
    def __str__(self):
        return self.title

# Modèle représentant les produits de fournitures scolaires
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.PositiveIntegerField(default=0)  

    def __str__(self):
        return self.name

# Modèle représentant une commande
class Order(models.Model):
    order_id = models.AutoField(primary_key=True, default=0)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    employee = models.ForeignKey(AppUser, on_delete=models.CASCADE, null=True, blank=True)
    products = models.ManyToManyField(Product, through='ProductOrder')
    status = models.CharField(max_length=50)  # Ex: En attente, Traitée, Expédiée
    date_order = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_id} - {self.customer.username}"

# Modèle représentant la relation entre les produits et les commandes
class ProductOrder(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

# # Modèle représentant une librairie
class Library(models.Model):
    employe = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    adresse = models.TextField()
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Notification(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    user = GenericForeignKey('content_type', 'object_id')
    message = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    # Other relevant fields

    def __str__(self):
        return self.message

#-----------INFOS------------------#
#Now, the Notification model can be associated with either a LibraryEmployee or a Customer. When creating a notification, you can set the content_type to the appropriate model (either LibraryEmployee or Customer) and the object_id to the ID of the specific user.
# library_employee = LibraryEmployee.objects.get(pk=employee_id)
# notification = Notification.objects.create(
#     content_type=ContentType.objects.get_for_model(LibraryEmployee),
#     object_id=library_employee.id,
#     message="Your notification message here",
#     # Other fields as needed
# )

# To the customer
# customer = Customer.objects.get(pk=customer_id)
# notification = Notification.objects.create(
#     content_type=ContentType.objects.get_for_model(Customer),
#     object_id=customer.id,
#     message="Your notification message here",
#     # Other fields as needed
# )
#-----------INFOS------------------#


