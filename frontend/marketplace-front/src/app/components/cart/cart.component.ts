import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent {
  phone_number: string = '';
  delivery_address: string = '';
  error: string = '';
  success: string = '';

  constructor(public cartService: CartService, private router: Router) {}

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

  placeOrder() {
    this.error = '';
    this.success = '';

    if (this.cartService.getItems().length === 0) {
      this.error = 'Cart is empty';
      return;
    }

    const phone = this.phone_number.trim();
    const address = this.delivery_address.trim();

    if (!phone || !address) {
      this.error = 'Please fill phone number and delivery address';
      return;
    }

    if (!/^\+\d{9,15}$/.test(phone)) {
      this.error = 'Phone number must be in format +123456789';
      return;
    }

    this.cartService.placeOrder(phone, address).subscribe({
      next: (order: any) => {
        this.cartService.clearCart();
        this.success = order?.id
          ? `Order #${order.id} placed successfully!`
          : 'Order placed successfully!';
        this.phone_number = '';
        this.delivery_address = '';
        setTimeout(() => this.router.navigate(['/orders'], { queryParams: { placed: order?.id } }), 800);
      },
      error: () => this.error = 'Failed to place order. Check phone format and try again.'
    });
  }
}
