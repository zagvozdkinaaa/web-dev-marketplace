from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Order
from .serializer import OrderListCreateSerializer, OrderUpdateSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """
    CRUD for orders. List/retrieve are scoped to the current user; staff sees all.
    Delete performs a soft delete (is_deleted).
    """

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = (
            Order.objects.filter(is_deleted=False)
            .select_related("user")
            .prefetch_related("items__product")
        )
        user = self.request.user
        if user.is_staff:
            return qs
        return qs.filter(user=user)

    def get_serializer_class(self):
        if self.action in ("update", "partial_update"):
            return OrderUpdateSerializer
        return OrderListCreateSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        output = OrderListCreateSerializer(instance, context={"request": request})
        return Response(output.data)

    def perform_destroy(self, instance):
        instance.delete()
