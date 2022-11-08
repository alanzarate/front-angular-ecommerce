import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName:"",
    productDescription:"",
    productActualPrice:0,
    productDiscountedPrice:0,
    productImages: []
  }

  constructor(private productService: ProductService,
    private sanitazer:  DomSanitizer) { }

  ngOnInit(): void {
  }

  addProduct(productForm: NgForm){

    const productFormData =  this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages = [];

        console.log("Respuesta de agregar productos");
        console.log(response);
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
    //console.log(this.product);
  }

  prepareFormData(product: Product): FormData{
    const formData = new FormData();
    
    formData.append(
      'product', 
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );

    for(var i = 0 ; i < product.productImages.length;  i++){
      formData.append(
        'imageFile',
        product.productImages[i].file, 
        product.productImages[i].file.name, 
      );
    }
    return formData;
  }

  onFileSelected(event:any){
    
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitazer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.product.productImages.push(fileHandle)


    }
  }

  removeImages(index:number){
    this.product.productImages.splice(index, 1)
  }

  fileDropped(fileHandle: FileHandle){
    this.product.productImages.push(fileHandle);
  }

}
