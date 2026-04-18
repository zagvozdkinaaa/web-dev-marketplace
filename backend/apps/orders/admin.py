from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product", "quantity", "price", "created_at", "updated_at")
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "phone_number", "delivery_address", "status", "created_at")
    list_filter = ("status", "created_at", "is_deleted")
    search_fields = ("id", "user__username", "phone_number", "delivery_address")
    readonly_fields = ("created_at", "updated_at", "is_deleted")
    inlines = [OrderItemInline]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price", "created_at")
    list_filter = ("created_at", "is_deleted")
    search_fields = ("order__id", "product__name")
    readonly_fields = ("created_at", "updated_at", "is_deleted")
