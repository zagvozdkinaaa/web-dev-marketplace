import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'http://127.0.0.1:8000/api/orders';

  constructor(private http: HttpClient) {}

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/`);
  }
}

