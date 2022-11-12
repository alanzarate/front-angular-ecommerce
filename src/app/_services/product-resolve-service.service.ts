import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveServiceService implements Resolve<Product> {

  constructor(
    private productSerive: ProductService,
    private imageProcessingService: ImageProcessingService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>  {
    const id = route.paramMap.get("productId");
    if(id){
      // fecth detail from backend
      return this.productSerive.getProductDetailsById(parseInt(id))
      .pipe(
        map(p => this.imageProcessingService.createImage(p) )
      );
    }else{
      // return empy product observable.
      return of(this.getProductDetails());
    }
  }

  getProductDetails(){
    return {
      productId: null,
      productName:"",
      productDescription:"",
      productActualPrice:0,
      productDiscountedPrice:0,
      productImages: []
    }
  }
}
