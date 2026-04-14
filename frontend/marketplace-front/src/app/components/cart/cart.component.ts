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
    if (!this.phone_number || !this.delivery_address) {
      this.error = 'Please fill phone number and delivery address';
      return;
    }
    this.cartService.placeOrder(this.phone_number, this.delivery_address).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.success = 'Order placed successfully!';
        setTimeout(() => this.router.navigate(['/products']), 2000);
      },
      error: () => this.error = 'Failed to place order'
    });
  }
}
