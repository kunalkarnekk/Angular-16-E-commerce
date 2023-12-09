import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:String = '';
  constructor(private product:ProductService){

  }
  addProduct(data:product){
    this.product.addProduct(data).subscribe((result)=>{
       console.warn(result);
       if(result){
        this.addProductMessage = 'Product is successfully added'
       }

       setTimeout(()=>{
         this.addProductMessage = '';
       },3000)
       
    })
  }
}
