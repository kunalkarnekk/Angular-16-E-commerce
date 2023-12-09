import { cart, order, product } from './../data-type';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http:HttpClient) { }
  addProduct(data:product){
     return this.http.post('http://localhost:3000/products' , data);    
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id:Number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProducts(id:String){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProducts(product:product){
    return this.http.put(`http://localhost:3000/products/${product.id}` , product);
  }


  popularProduct(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=5`);
  }

  TrendyProduct(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`);
  }

  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localcart');
    if(!localCart){
      localStorage.setItem('localcart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else{
        cartData = JSON.parse(localCart);
        cartData.push(data);
        localStorage.setItem('localcart' , JSON.stringify(cartData));
        this.cartData.emit(cartData);
    }
   
  }

  removeToFromCart(productId:Number){
    let cartData = localStorage.getItem('localcart');
    if(cartData){
      let items:product[] = JSON.parse(cartData);
      items = items.filter((item:product)=>productId !== item.id)
        console.warn(items);
        localStorage.setItem('localcart' , JSON.stringify(items));
        this.cartData.emit(items);
    }
  }

  AddToCartWithUserLogin(cartData:cart){
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId :Number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=`+userId ,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result);
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    })

  }

  removeToCart(cartId:Number){
    return this.http.delete(`http://localhost:3000/cart/`+cartId);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=`+ userData.id);
  }


  orderNow(data:order){
     return this.http.post('http://localhost:3000/orders' , data);
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=`+userData.id);
  }

  deleteCartItem(cartId:Number){
    return this.http.delete(`http://localhost:3000/cart/`+cartId ,
     {observe:'response'}
    ).subscribe((result)=>{
       if(result){
        this.cartData.emit([]);
       }
    })
  }

  CancleOrder(orderId:Number){
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }
}
