import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  updateProductMessage: String | undefined;
  productData: undefined | product;
  constructor(private route: ActivatedRoute, private product: ProductService , private router:Router) {

  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProducts(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    })

  }
  updateProducts(data: product) {
      console.warn(data);
      if(this.productData){
        data.id = this.productData.id;
      }
      this.product.updateProducts(data).subscribe((result)=>{
          if(result){
            this.updateProductMessage = 'Product Updated successfully';
          }

          this.router.navigate(['/seller-home']);

          setTimeout(() => {
            this.updateProductMessage = undefined;
          }, 3000);
      })
  }
}
