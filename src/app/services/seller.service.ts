import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<Boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: signUp) {
    let result = this.http.post('http://localhost:3000/Seller', data,
      { observe: 'response' }).subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        console.warn(result);
      })

  }



  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    this.http.get(`http://localhost:3000/Seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length) {
        console.warn("User logged in ");
        localStorage.setItem('seller' , JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
      else {
        console.warn("logged failed");
        this.isLoginError.emit(true);
      }


    })

  }
}
