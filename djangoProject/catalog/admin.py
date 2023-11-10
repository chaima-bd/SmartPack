from django.contrib import admin
from .models import Customer, Order, LibraryStaff, Library, OrderItem, Product, Address

# Register your models here.
admin.site.register(Customer)
admin.site.register(Library)
admin.site.register(LibraryStaff)
admin.site.register(Address)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
