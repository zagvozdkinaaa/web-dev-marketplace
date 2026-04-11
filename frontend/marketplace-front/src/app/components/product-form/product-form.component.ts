import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  name = '';
  price = '';
  description = '';
  error = '';
  isEdit = false;
  productId: number | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      this.productService.getOne(this.productId).subscribe({
        next: (data) => {
          this.name = data.name;
          this.price = data.price;
          this.description = data.description;
        },
        error: () => this.error = 'Failed to load product'
      });
    }
  }

  save() {
    const data = { name: this.name, price: this.price, description: this.description };
    if (this.isEdit && this.productId) {
      this.productService.update(this.productId, data).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.error = 'Failed to update product'
      });
    } else {
      this.productService.create(data).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.error = 'Failed to create product'
      });
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
