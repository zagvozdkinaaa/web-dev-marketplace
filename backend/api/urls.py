from django.urls import path
from .views.auth import register, login, logout
from .views.views_products import CategoryList

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path("categories/", CategoryList.as_view(), name="category-list"),
]

