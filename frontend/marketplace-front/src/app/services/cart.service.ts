import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Order, OrderItem } from '../models/models';
import { Observable } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://127.0.0.1:8000/api/orders';
  private items: CartItem[] = [];

  constructor(private http: HttpClient) {}

  addToCart(product: Product) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  removeItem(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
  }

  getItemTotal(item: CartItem): number {
    return parseFloat(item.product.price) * item.quantity;
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + this.getItemTotal(i), 0);
  }

  clearCart() {
    this.items = [];
  }

  placeOrder(phone_number: string, delivery_address: string): Observable<Order> {
    const orderItems: OrderItem[] = this.items.map(i => ({
      product: i.product.id,
      quantity: i.quantity
    }));
    return this.http.post<Order>(`${this.baseUrl}/`, {
      phone_number,
      delivery_address,
      order_items: orderItems
    });
  }
}
