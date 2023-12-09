import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData: order[] | undefined
  constructor(private product_service: ProductService) {

  }

  ngOnInit(): void {
    this.getOrderList();


  }

  cancleOrder(orderId: Number | undefined) {
    orderId && this.product_service.CancleOrder(orderId).subscribe((result) => {
        this.getOrderList();
    })
  }

  getOrderList() {
    this.product_service.orderList().subscribe((result) => {
      this.orderData = result
    })
  }
}
