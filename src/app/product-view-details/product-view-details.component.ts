import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  selectedProdIndex:number = 0;

  product: Product = {
    productId: null,
    productName:"",
    productDescription:"",
    productActualPrice:0,
    productDiscountedPrice:0,
    productImages: []
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
     
  }
  changeIndex(index:any){
    this.selectedProdIndex = index;
  }

  buyProduct(productId:number){
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true,
      id: productId
    }]);
  }
 

}
