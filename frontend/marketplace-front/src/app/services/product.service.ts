import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getOne(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}/`);
  }

  create(data: any) {
    return this.http.post(`${this.baseUrl}/`, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}/`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}/`);
  }
}
