from django.db import models
from django.db.models import CASCADE
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name

class Order(models.Model):
    MAX_STATUS_LENGTH: int = 20
    STATUS_CHOICES: list[tuple[str, str]] = [
        ("P", "Pending"),
        ("D", "Delivered"),
        ("C", "Cancelled"),
    ]
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='orders')
    phone_number = models.CharField(max_length=15)
    delivery_address = models.CharField(max_length=100)
    status = models.CharField(max_length=MAX_STATUS_LENGTH, choices=STATUS_CHOICES, default="P")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=CASCADE, related_name='order_items')
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in order {self.order.id}"

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='reviews')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('product', 'user')

    def __str__(self):
        return f"Review {self.id} by {self.user.username}"