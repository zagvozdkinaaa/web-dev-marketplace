from rest_framework import generics

from apps.catalog.models import Category, Product

from .serializer import CategorySerializer, ProductOverviewSerializer, ProductSerializer


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductOverview(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductOverviewSerializer


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer