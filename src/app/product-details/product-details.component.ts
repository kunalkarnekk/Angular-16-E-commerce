import { cart, product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity = 1;
  removeCart = false;
  cartData: product | undefined;
  constructor(private route: ActivatedRoute, private product_service: ProductService) {

  }

  ngOnInit(): void {
    let productid = this.route.snapshot.paramMap.get('productId');
    console.warn(productid);
    productid && this.product_service.getProducts(productid).subscribe((result) => {
      console.warn(result);
      this.productData = result;
    })

    let cartData = localStorage.getItem('localcart');
    if (productid && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: product) => productid == item.id.toString());
      if (items.length) {
        this.removeCart = true;
      }
      else {
        this.removeCart = false;
      }
    }

    // refresh page still data showing correct logic
    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user).id;
      this.product_service.getCartList(userId);

      this.product_service.cartData.subscribe((result) => {
        let item = result.filter((item: product) => productid?.toString() === item.productId?.toString())
        if (item.length) {
          this.cartData = item[0];
          this.removeCart = true;
        }
      })

    }

  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity = 1;
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      //User Not Login
      if (!localStorage.getItem('user')) {
        this.product_service.localAddToCart(this.productData);
        this.removeCart = true;
      }
      //User Logged in 
      else {
        console.warn("user loggedin ");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id
        }
        delete cartData.id;
        console.warn(cartData);
        this.product_service.AddToCartWithUserLogin(cartData).subscribe((result) => {
          if (result) {
            this.product_service.getCartList(userId);
            this.removeCart = true;
          }

        })


      }

    }
  }

  removeToCart(productId: Number) {
    if (!localStorage.getItem('user')) {
      this.product_service.removeToFromCart(productId);
      this.removeCart = false;
    }
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(this.cartData);
      this.cartData && this.product_service.removeToCart(this.cartData.id).subscribe((result) => {
        if (result) {
          this.product_service.getCartList(userId);

        }
      })
      this.removeCart = false;

    }
  }

}
