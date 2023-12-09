import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  sellerName: String = '';
  searchResult : undefined | product[];
  userName:String='';
  cartItem  = 0;
  constructor(private router: Router , private product_sevice : ProductService) {

  }

  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('is seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product_sevice.getCartList(userData.id); // when refresh page hits this api

        }
        else {
          console.warn('outside seller');
          this.menuType = 'default';
        }
      }

    })

    let cartData = localStorage.getItem('localcart');
    if(cartData){
      this.cartItem = JSON.parse(cartData).length;
    }

    this.product_sevice.cartData.subscribe((item)=>{  // EventEmiiter called because latest data see
      this.cartItem = item.length;
    })
  }

  Logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/user-auth']);
    this.product_sevice.cartData.emit([]);  // when user logout. cart value is zero
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      console.warn(element.value);
      this.product_sevice.searchProduct(element.value).subscribe((result)=>{
        console.log(result);
        if(result.length > 5){
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch(){
    this.searchResult = undefined;
  }

  redirectToDetails(id:Number){
      this.router.navigate(['/details/'+id])
  }

  searchSubmit(val:string){
    console.warn(val);
    this.router.navigate([`search/${val}`])
    
  }

  LogOutUser(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }
}
