import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/`);
  }

  getByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/?category=${categoryId}`);
  }

  getOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}/`);
  }

  create(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/`, data);
  }

  update(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/`);
  }
}
