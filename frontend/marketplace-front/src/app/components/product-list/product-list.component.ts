import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedCategory: number | null = null;
  error = '';
  message = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: () => {}
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: () => this.error = 'Failed to load products'
    });
  }

  filterByCategory(categoryId: number | null) {
    this.selectedCategory = categoryId;
    this.error = '';
    if (categoryId === null) {
      this.loadProducts();
    } else {
      this.productService.getByCategory(categoryId).subscribe({
        next: (data) => this.products = data,
        error: () => this.error = 'Failed to filter'
      });
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.message = `${product.name} added to cart!`;
    setTimeout(() => this.message = '', 2000);
  }

  delete(id: number) {
    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: () => this.error = 'Failed to delete'
    });
  }
}
