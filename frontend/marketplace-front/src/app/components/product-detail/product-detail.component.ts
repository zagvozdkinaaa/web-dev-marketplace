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
      this.loadProduct(parseInt(id));
      this.loadReviews(id);
    }
  }

  loadProduct(id: number) {
    this.productService.getOne(id).subscribe({
      next: (data: any) => this.product = data,
      error: () => this.error = 'Failed to load product'
    });
  }

  loadReviews(id: string) {
    this.reviewService.getReviews(id).subscribe({
      next: (data: any) => this.reviews = data,
      error: () => this.error = 'Failed to load reviews'
    });
  }

  submitReview(id: string) {
    this.reviewService.addReview(id, {
      rating: this.rating,
      comment: this.comment
    }).subscribe({
      next: () => {
        this.success = 'Review submitted!';
        this.comment = '';
        this.rating = 5;
        this.loadReviews(id);
      },
      error: () => this.error = 'Failed to submit review'
    });
  }
}
