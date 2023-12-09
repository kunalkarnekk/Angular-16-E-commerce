import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  popularProducts:undefined | product[];
  trendyProduct:undefined | product[];
  constructor(private product_service : ProductService){

  }

  ngOnInit():void{
      this.product_service.popularProduct().subscribe((data)=>{
        console.warn(data);
        this.popularProducts = data;
      })

      this.product_service.TrendyProduct().subscribe((data)=>{
        this.trendyProduct = data;
      })
  }
  
}
