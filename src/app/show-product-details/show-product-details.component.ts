import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ShowProdImagesDialogComponent } from '../show-prod-images-dialog/show-prod-images-dialog.component';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'NOMBRE', 'description', 'CON DESCUENTO', 'REGULAR', 'Actions'];
  productDetails: Product[]=  [];

  constructor( 
    private productService: ProductService,
    public imagesDialog: MatDialog,
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

  public deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(
      (resp) =>{
        this.getAllProducts();
        console.log(resp);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(
      ShowProdImagesDialogComponent,{
        height: '80%',
        width: '80%',
        data:{
          images: product.productImages
        }
      }
      
    );

  }

  public editProductDetails(productId: number){
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  }

}
