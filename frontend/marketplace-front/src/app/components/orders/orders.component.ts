import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  error = '';
  justPlacedId: number | null = null;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('placed');
    this.justPlacedId = id ? Number(id) : null;
    this.load();
  }

  load() {
    this.error = '';
    this.orderService.getMyOrders().subscribe({
      next: (data) => (this.orders = data),
      error: () => (this.error = 'Failed to load orders'),
    });
  }

  trackById(_: number, o: Order) {
    return o?.id;
  }
}

