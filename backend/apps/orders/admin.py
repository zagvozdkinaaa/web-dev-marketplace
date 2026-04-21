from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("created_at", "updated_at")
    can_delete = True


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "phone_number", "delivery_address", "status", "is_deleted", "created_at")
    list_filter = ("status", "created_at", "is_deleted")
    search_fields = ("id", "user__username", "phone_number", "delivery_address")
    readonly_fields = ("created_at", "updated_at")
    inlines = [OrderItemInline]
    actions = ["hard_delete"]

    @admin.action(description="Hard delete selected orders")
    def hard_delete(self, request, queryset):
        for obj in queryset:
            # We use models.Model.delete to skip our soft delete override
            super(Order, obj).delete()
        self.message_user(request, f"Successfully hard deleted {queryset.count()} orders.")


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price", "is_deleted", "created_at")
    list_filter = ("created_at", "is_deleted")
    search_fields = ("order__id", "product__name")
    readonly_fields = ("created_at", "updated_at")
    actions = ["hard_delete"]

    @admin.action(description="Hard delete selected items")
    def hard_delete(self, request, queryset):
        for obj in queryset:
            super(OrderItem, obj).delete()
        self.message_user(request, f"Successfully hard deleted {queryset.count()} items.")
