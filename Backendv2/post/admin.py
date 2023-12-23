from django.contrib import admin
from .models import Post, Product, Order, Customer, ProductOrder, Library, Notification


# Register your models her
admin.site.register(Post)
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(ProductOrder)
admin.site.register(Library)
admin.site.register(Notification)

