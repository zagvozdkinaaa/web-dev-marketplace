import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: []
})
export class ProductDetailComponent implements OnInit {
  product: any;
  productId: number | null = null;
  reviews: any[] = [];
  rating: number = 5;
  comment: string = '';
  success: string = '';
  error: string = '';

  currentUsername: string | null = null;
  isEditing: boolean = false;
  editingReviewId: number | null = null;
  editRating: number = 5;
  editComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUsername = this.authService.getUsername();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = parseInt(id, 10);
      if (!Number.isNaN(this.productId)) {
        this.loadProduct(this.productId);
        this.loadReviews(this.productId);
      } else {
        this.error = 'Invalid product id';
      }
    }
  }

  loadProduct(id: number) {
    this.productService.getOne(id).subscribe({
      next: (data: any) => this.product = data,
      error: (err) => {
        this.error = err?.error?.detail || 'Product not found or failed to load';
      }
    });
  }

  loadReviews(id: number) {
    this.reviewService.getReviews(id).subscribe({
      next: (data: any) => this.reviews = data,
      error: () => this.error = 'Failed to load reviews'
    });
  }

  submitReview(id: number) {
    this.error = '';
    this.success = '';

    this.reviewService.addReview(id, {
      rating: this.rating,
      comment: this.comment
    }).subscribe({
      next: (createdReview: any) => {
        this.success = 'Review submitted!';
        this.comment = '';
        this.rating = 5;
        this.reviews = [createdReview, ...this.reviews];
      },
      error: (err) => {
        this.error = err?.error?.non_field_errors?.[0]
          || err?.error?.detail
          || 'Failed to submit review';
      }
    });
  }

  isMyReview(review: any): boolean {
    return !!this.currentUsername && review?.username === this.currentUsername;
  }

  startEdit(review: any) {
    this.error = '';
    this.success = '';
    this.isEditing = true;
    this.editingReviewId = review?.id ?? null;
    this.editRating = review?.rating ?? 5;
    this.editComment = review?.comment ?? '';
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingReviewId = null;
    this.editRating = 5;
    this.editComment = '';
  }

  saveEdit() {
    if (!this.productId || !this.editingReviewId) return;
    this.error = '';
    this.success = '';

    this.reviewService.updateReview(this.productId, this.editingReviewId, {
      rating: this.editRating,
      comment: this.editComment,
    }).subscribe({
      next: (updated: any) => {
        this.success = 'Review updated!';
        this.reviews = this.reviews.map(r => r?.id === updated?.id ? updated : r);
        this.cancelEdit();
      },
      error: (err) => {
        this.error = err?.error?.error
          || err?.error?.detail
          || 'Failed to update review';
      }
    });
  }

  deleteReview(review: any) {
    if (!this.productId || !review?.id) return;
    this.error = '';
    this.success = '';

    this.reviewService.deleteReview(this.productId, review.id).subscribe({
      next: () => {
        this.success = 'Review deleted!';
        this.reviews = this.reviews.filter(r => r?.id !== review.id);
        if (this.editingReviewId === review.id) this.cancelEdit();
      },
      error: (err) => {
        this.error = err?.error?.error
          || err?.error?.detail
          || 'Failed to delete review';
      }
    });
  }
}
