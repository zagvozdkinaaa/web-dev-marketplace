import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://127.0.0.1:8000/api/orders';
  private items: any[] = [];

  constructor(private http: HttpClient) {}

  addToCart(product: any) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  getItems() {
    return this.items;
  }

  removeItem(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  clearCart() {
    this.items = [];
  }

  placeOrder(phone_number: string, delivery_address: string) {
    const orderItems = this.items.map(i => ({
      product: i.product.id,
      quantity: i.quantity
    }));
    return this.http.post(`${this.baseUrl}/`, {
      phone_number,
      delivery_address,
      order_items: orderItems
    });
  }
}
