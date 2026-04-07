from rest_framework import serializers
from apps.catalog.models import Product, Category
from apps.orders.models import Order, OrderItem
from apps.reviews.models import Review
from django.contrib.auth import authenticate

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category']

class LoginSerializer(serializers.Serializer):
    login = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=50)

class OrderSerializer(serializers.Serializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(serializers.Serializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class ReviewSerializer(serializers.Serializer):
    class Meta:
        model = Review
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")