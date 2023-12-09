import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User, cart, loginUser, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
  loginFailMessage: string | undefined;
  constructor(private user_service: UserService, private product_service: ProductService) {

  }

  ngOnInit(): void {
    this.user_service.userAuthReload();
  }

  UserSignUp(val: User) {
    //  console.warn(val);
    this.user_service.userSignUp(val);
  }

  UserLogIn(data: loginUser) {
    this.user_service.UserLogIn(data);
    this.user_service.isLoginError.subscribe((isError) => {
      if(isError) {
        console.warn(isError);
        
        this.loginFailMessage = 'Please provide correct details';
        setTimeout(() => {
          this.loginFailMessage = '';
        }, 3000);
      }else{
        this.localcartToRemoveCart();
      }
    })
  }

  showRegister() {
    this.showLogin = false;
  }

  showLogins() {
    this.showLogin = true;
  }


  localcartToRemoveCart() {
    let cartData = localStorage.getItem('localcart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
    if (cartData) {
      let cartDataList: product[] = cartData && JSON.parse(cartData);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout(() => {
          this.product_service.AddToCartWithUserLogin(cartData).subscribe((result) => {
            if (result) {
              console.warn('item stored in DB');

            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localcart');
          }
        }, 500);

      });
    }

    setTimeout(() => {
      this.product_service.getCartList(userId);
    }, 2000);
  }
}
