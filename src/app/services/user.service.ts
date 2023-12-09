import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User, loginUser } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient , private router : Router) { }

  userSignUp(user:User){
    this.http.post('http://localhost:3000/Users' , user, {
      observe:'response'
    }).subscribe((result)=>{
       if(result){
        localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
       }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  UserLogIn(user:loginUser){
    this.http.get<loginUser[]>(`http://localhost:3000/Users?gmail=${user.email}&password=${user.password}` ,
    {observe:'response'}
    ).subscribe((result)=>{
      console.warn(result);
      if(result && result.body?.length){
        localStorage.setItem('user' , JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.isLoginError.emit(false);
      }
      else{
        console.warn('Login failed');
        
        this.isLoginError.emit(true);
      }
    })
    
  }
}
