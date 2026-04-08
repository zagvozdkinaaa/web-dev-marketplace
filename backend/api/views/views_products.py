from django.shortcuts import render
from rest_framework import generics
from apps.catalog.models import Product, Category
from apps.orders.models import Order, OrderItem
from apps.reviews.models import Review
from api.serializer import ProductOverviewSerializer, ProductSerializer, ReviewSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.contrib.auth.models import User


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer 

class ProductOverview(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductOverviewSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# full crud for reviews using cbv
class ReviewListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request, product_id):
        reviews = Review.objects.filter(product_id=product_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, product_id):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, product_id=product_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, product_id, pk):
        try:
            return Review.objects.get(product_id=product_id, pk=pk)
        except Review.DoesNotExist:
            return None

    def get(self, request, product_id, pk):
        review = self.get_object(product_id, pk)
        if not review:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def put(self, request, product_id, pk):
        review = self.get_object(product_id, pk)
        if not review:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if review.user != request.user:
            return Response({'error': 'You can only edit your own reviews'}, status=status.HTTP_403_FORBIDDEN)

        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, product_id, pk):
        review = self.get_object(product_id, pk)
        if not review:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
            
        if review.user != request.user:
            return Response({'error': 'You can only delete your own reviews'}, status=status.HTTP_403_FORBIDDEN)
        
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)