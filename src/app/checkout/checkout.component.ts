import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData:cart[] | undefined;
  orderMessage : String = '';
  constructor(private product_service: ProductService , private router : Router) { }

  ngOnInit(): void {
    this.product_service.currentCart().subscribe((result) => {
      console.warn(result);

      this.cartData= result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+ item.price * + item.quantity);
        }
      });

      this.totalPrice = price + (price / 10) + 40 - (price / 10)
      console.warn(this.totalPrice);


    })


  }

  OrderDatas(data: { email: String, address: String, contact: String }) {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      if(this.totalPrice){
        let orderData:order = {
          ...data,
          totalPrice:this.totalPrice,
          userId,
          id:undefined
        }

        this.cartData?.forEach((item)=>{
            setTimeout(() => {
             item.id && this.product_service.deleteCartItem(item.id);
            }, 2000);
        })

        this.product_service.orderNow(orderData).subscribe((result)=>{
           if(result){
              this.orderMessage = "Your order has been placeed";
              setTimeout(() => {
                this.router.navigate(['/my-orders']);
                this.orderMessage = '';
              }, 4000);
           }
        })
      }
  }
}
