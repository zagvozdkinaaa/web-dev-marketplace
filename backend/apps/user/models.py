class CustomerUser(AbstractUser):
    """
    CustomUser database (table) model.
    """
    MAX_PHONE_LENGTH: int = 20
    MAX_EMAIL_ADDRESS: int = 20
    MAX_ADDRESS_LENGTH: int = 255

    email: EmailField = EmailField(unique=True, max_length = MAX_EMAIL_ADDRESS)
    phone: PhoneField = PhoneField(unique=True)