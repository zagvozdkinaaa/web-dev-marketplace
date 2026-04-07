from django.shortcuts import render
from rest_framework import generics
from apps.catalog.models import Product, Category
from apps.orders.models import Order, OrderItem
from apps.reviews.models import Review

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .serializer import LoginSerializer, ProductOverviewSerializer, ProductSerializer
from rest_framework import status


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer 

class ProductOverview(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductOverviewSerializer

#using cbv
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })

# using fbv 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)