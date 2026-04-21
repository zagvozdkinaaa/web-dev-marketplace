import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

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
  categoryId: number | null = null;
  error = '';
  isEdit = false;
  productId: number | null = null;
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      this.productService.getOne(this.productId).subscribe({
        next: (data) => {
          this.name = data.name;
          this.price = data.price;
          this.description = data.description;
          this.categoryId = data.category ?? null;
        },
        error: () => this.error = 'Failed to load product'
      });
    }
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: () => {}
    });
  }

  save() {
    this.error = '';
    if (!this.categoryId) {
      this.error = 'Please select a category';
      return;
    }

    const data = {
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.categoryId,
    };
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
