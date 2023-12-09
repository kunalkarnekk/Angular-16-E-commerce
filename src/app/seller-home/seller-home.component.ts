import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {faTrash , faEdit} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  deleteProductMessage:undefined | String;
  deleteIcon = faTrash;
  editIcon=faEdit;
  constructor(private product: ProductService) {

  }

  ngOnInit(): void {
      this.productLists();
  }

  deleteProduct(id:Number){
      console.warn('test id ' , id);
      this.product.deleteProduct(id).subscribe((result)=>{
        if(result){
          this.deleteProductMessage = "Product deleted successfully";
        }
      })

      setTimeout(() => {
        this.deleteProductMessage = undefined;
      }, 3000);

      this.productLists();
  }

  productLists(){   // for refresh function 
    this.product.productList().subscribe((result) => {
      console.warn(result);
      if (result) {
        this.productList = result;
      }
    })
  }
}
