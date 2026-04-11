import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: () => this.error = 'Failed to load products'
    });
  }

  delete(id: number) {
    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: () => this.error = 'Failed to delete product'
    });
  }
}
