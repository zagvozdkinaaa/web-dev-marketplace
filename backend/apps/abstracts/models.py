from django.db import models


class AbstractBaseModel(models.Model):
    """
    Abstract base model for project models.
    """

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Created At",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Updated At",
    )
    is_deleted = models.BooleanField(
        default=False,
        verbose_name="Is Deleted",
    )

    class Meta:
        """Meta class."""

        abstract = True

    def soft_delete(self) -> None:
        """Perform soft delete."""
        self.is_deleted = True
        self.save()

    def delete(self, *args, **kwargs) -> None:
        """Override delete to perform soft delete."""
        self.soft_delete()
