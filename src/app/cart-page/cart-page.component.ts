import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivary: 0,
    total: 0
  }
  constructor(private product_service: ProductService, private router: Router) { }

  ngOnInit(): void {

    this.loadDetails();

  }

  loadDetails() {
    this.product_service.currentCart().subscribe((result) => {
      console.warn(result);
      this.cartData = result;

      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+ item.price * + item.quantity);
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.delivary = 40;
      this.priceSummary.tax = price / 10;
      this.priceSummary.total = price + (price / 10) + 40 - (price / 10)

      if(!this.cartData.length){
        this.router.navigate(['/']);
      }

    })
  }

  removeTocart(cartId: Number | undefined) {
    cartId && this.cartData && this.product_service.removeToCart(cartId).subscribe((result) => {
      this.loadDetails();
    })
  }

  checkout() {
    this.router.navigate(['checkout']);
  }
}
