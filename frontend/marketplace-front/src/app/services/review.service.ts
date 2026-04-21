import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/products/${productId}/reviews/`);
  }

  addReview(productId: number, review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/products/${productId}/reviews/`, review);
  }

  updateReview(
    productId: number,
    reviewId: number,
    review: Partial<Review>
  ): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/products/${productId}/reviews/${reviewId}/`, review);
  }

  deleteReview(productId: number, reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${productId}/reviews/${reviewId}/`);
  }
}
