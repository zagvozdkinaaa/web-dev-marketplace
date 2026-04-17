from django.db import models
from django.contrib.auth.models import User
from apps.catalog.models import Product
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from apps.abstracts.models import AbstractBaseModel

class Order(AbstractBaseModel):
    STATUS_CHOICES = [("P", "Pending"), ("D", "Delivered"), ("C", "Cancelled")]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    phone_number = models.CharField(max_length=15)
    delivery_address = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="P")

    class Meta:
        ordering = ('-created_at',)
        default_related_name = 'orders'

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

    def clean(self) -> None:
        super().clean()
        if self.phone_number:
            if not self.phone_number.startswith("+"):
                raise ValidationError("Phone number must start with +")
            digits = self.phone_number[1:]
            if not digits.isdigit():
                raise ValidationError(
                    "Phone number must contain only digits after +"
                )
            if len(digits) < 9 or len(digits) > 15:
                raise ValidationError(
                    "Phone number must have between 9 and 15 digits"
                )

        if not self.delivery_address or not self.delivery_address.strip():
            raise ValidationError("Delivery address cannot be empty")

    def save(self, *args, **kwargs) -> None:
        self.full_clean()
        super().save(*args, **kwargs)

class OrderItem(AbstractBaseModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.IntegerField(default=1, validators=[MinValueValidator(1)], verbose_name="Ordered quantity")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")

    class Meta:
        ordering = ['-created_at']
        default_related_name = 'order_items'

    def __str__(self):
        return f"Order item from order: {self.order.id} - {self.product.name}"

    def save(self, *args, **kwargs):
        if not self.price:
            self.price = self.product.price
        super().save(*args, **kwargs)
