from rest_framework import serializers
from django.db import transaction
from .models import Order, OrderItem
from apps.reviews.models import Review
from apps.catalog.models import Product

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "user",
            "product",
            "rating",
            "comment",
            "created_at",
        ]
        read_only_fields = ["id", "user", "created_at"]


class OrderItemBaseSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    total_product_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product",
            "product_name",
            "price",
            "quantity",
            "total_product_price",
        )
        read_only_fields = ("price",)

    def get_total_product_price(self, obj: OrderItem) -> float:
        return round(obj.price * obj.quantity, 2)


class OrderListCreateSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    order_items = OrderItemBaseSerializer(many=True, source='items')
    total_positions = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "phone_number",
            "delivery_address",
            "status",
            "total_positions",
            "total_price",
            "order_items",
            "created_at",
            "updated_at",
            "is_deleted",
        )
        read_only_fields = ["status", "created_at", "updated_at", "is_deleted"]

    def validate_order_items(self, value: list) -> list:
        if not value:
            raise serializers.ValidationError("Order must contain at least one item.")
        return value

    def get_total_positions(self, obj: Order) -> int:
        return obj.items.count()

    def get_total_price(self, obj: Order) -> float:
        total = sum(item.price * item.quantity for item in obj.items.all())
        return round(total, 2)

    @transaction.atomic
    def create(self, validated_data):
        # Nested field is `order_items` in API, but validated_data key follows `source='items'`.
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            product = item_data['product']
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item_data['quantity'],
                price=product.price
            )
        return order


class OrderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("phone_number", "delivery_address", "status")