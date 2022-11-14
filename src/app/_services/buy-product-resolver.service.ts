import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
    
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get("id");  
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
 
    if(id){
   
      return this.productService.getProductDetails((isSingleProductCheckout === 'true'), parseInt(id))
      .pipe(
        map(
          (x: Product[], i) => x.map( (product: Product) => this.imageProcessingService.createImage(product))
        )
      );
    }else{
     
      return [];
    }
  }
}
