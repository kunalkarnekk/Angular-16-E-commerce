import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult : undefined | product[]
  NoSearchResult:string = '';
  constructor(private route:ActivatedRoute , private product_service : ProductService){
    
  }
  ngOnInit(): void {
      let query = this.route.snapshot.paramMap.get('query');
      console.warn(query);
      query && this.product_service.searchProduct(query).subscribe((Result)=>{
         if(Result){
          this.searchResult = Result;
         }
         else{
            this.NoSearchResult = 'Product is not found';
         }
         
      })
      
  }
}
