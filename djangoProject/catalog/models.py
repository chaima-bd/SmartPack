from decimal import Decimal
from typing import Tuple

from django.contrib.auth.models import User
from django.db import models

from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    phone_number = PhoneNumberField(null=False, blank=False, unique=True, region="MA")
    image = models.ImageField(
        default='default.jpg',
        upload_to='profile_pics',
        null=True)

    def __str__(self):
        return self.user.username


class Library(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class LibraryStaff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    phone_number = PhoneNumberField(null=False, blank=False, unique=True)
    library = models.ForeignKey(Library, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Product(models.Model):
    description = models.TextField()
    slug = models.SlugField(unique=True)
    stock = models.IntegerField(default=0)
    title = models.CharField(max_length=150)
    active = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='product_images')
    price = models.DecimalField(default=0, max_digits=9, decimal_places=2, )

    def __str__(self) -> str:
        return self.title

    @property
    def in_stock(self) -> bool:
        return self.stock > 0


class Address(models.Model):
    SHIPPING_ADDRESS_TYPE: str = 'S'
    BILLING_ADDRESS_TYPE: str = 'B'
    ADDRESS_CHOICES: Tuple[Tuple[str, str], ...] = (
        (BILLING_ADDRESS_TYPE, 'Billing'),
        (SHIPPING_ADDRESS_TYPE, 'Shipping'),
    )

    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    default = models.BooleanField(default=False)
    address_line_1 = models.CharField(max_length=150)
    address_line_2 = models.CharField(max_length=150)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    address_type = models.CharField(max_length=1, choices=ADDRESS_CHOICES)

    class Meta:
        verbose_name: str = 'Address'
        verbose_name_plural: str = 'Addresses'

    def __str__(self) -> str:
        return ', '.join([
            self.address_line_1,
            self.address_line_2,
            self.city,
            self.zip_code,
        ])


class OrderItem(models.Model):
    quantity = models.PositiveIntegerField(default=1)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)

    order = models.ForeignKey(
        to="Order",
        related_name='items',
        on_delete=models.CASCADE,
    )

    def __str__(self) -> str:
        return f"{self.quantity} x {self.product.title}"

    def get_raw_total_item_price(self) -> Decimal:
        return self.quantity * self.product.price

    def get_total_item_price(self) -> str:
        price = self.get_raw_total_item_price()  # 1000
        return "{:.2f}".format(price / 100)


class Order(models.Model):
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField(blank=True, null=True)
    status = models.BooleanField(default=False)
    customer = models.ForeignKey(to=Customer, on_delete=models.CASCADE)
    libraryStaff = models.ForeignKey(to=LibraryStaff, on_delete=models.SET_NULL, blank=True, null=True)

    billing_address = models.ForeignKey(
        to=Address,
        on_delete=models.SET_NULL,
        related_name='billing_address',
        blank=True, null=True,
    )
    shipping_address = models.ForeignKey(
        to=Address,
        on_delete=models.SET_NULL,
        related_name='shipping_address',
        blank=True, null=True,
    )

    def __str__(self) -> str:
        return self.reference_number

    @property
    def reference_number(self) -> str:
        return f"ORDER-{self.pk}"

    def get_raw_subtotal(self) -> float:
        total = 0
        for order_item in self.items.all():
            total += order_item.get_raw_total_item_price()
        return total

    def get_subtotal(self) -> str:
        subtotal = self.get_raw_subtotal()
        return "{:.2f}".format(subtotal / 100)

    def get_raw_total(self) -> float:
        subtotal = self.get_raw_subtotal()
        # add tax, add delivery, subtract discounts
        # total = subtotal - discounts + tax + delivery
        return subtotal

    def get_total(self) -> str:
        total = self.get_raw_total()
        return "{:.2f}".format(total / 100)



