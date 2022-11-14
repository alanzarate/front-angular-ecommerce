
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails: Product[] = [];
  constructor( 
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map( 
        (x: Product[], i) => 
          x.map( (product:Product) => 
            this.imageProcessingService.createImage(product) 
            )
        )
    )
    .subscribe(
      (resp: Product[]) =>{
        console.log(resp);
        this.productDetails = resp;
      }, (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  showProductDetails(productId: number){
    this.router.navigate(['/productViewDetails', {productId: productId}])
  }

}
