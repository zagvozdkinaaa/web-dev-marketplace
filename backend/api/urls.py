from django.urls import path
from .views.auth import register, login, logout
from .views.views_products import ProductList, ProductDetailView, ReviewListCreateView, ReviewDetailView

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('products/<int:product_id>/reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('products/<int:product_id>/reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]