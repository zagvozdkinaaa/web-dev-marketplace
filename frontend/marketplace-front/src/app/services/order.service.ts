import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'http://127.0.0.1:8000/api/orders';

  constructor(private http: HttpClient) {}

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/`);
  }

  getOne(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}/`);
  }
}

