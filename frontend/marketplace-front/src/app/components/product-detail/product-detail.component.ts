import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
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
}
