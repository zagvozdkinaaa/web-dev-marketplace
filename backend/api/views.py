from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer, ProductOverviewSerializer

# Create your views here.
class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer 

class ProductOverview(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductOverviewSerializer