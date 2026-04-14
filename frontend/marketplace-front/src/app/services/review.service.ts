import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getReviews(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/${productId}`);
  }

  addReview(productId: string, review: { rating: number; comment: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/${productId}`, review);
  }
}
