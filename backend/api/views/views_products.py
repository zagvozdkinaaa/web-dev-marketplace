from django.shortcuts import render
from rest_framework import generics
from apps.catalog.models import Product, Category
from apps.orders.models import Order, OrderItem
from apps.reviews.models import Review
from .serializer import ProductOverviewSerializer, ProductSerializer


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer 

class ProductOverview(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductOverviewSerializer