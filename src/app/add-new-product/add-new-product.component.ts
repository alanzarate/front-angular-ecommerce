import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    productDiscountedPrice:0
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(productForm: NgForm){
    this.productService.addProduct(this.product).subscribe(
      (response: Product) => {
        productForm.reset();

        console.log("Respuesta de agregar productos");
        console.log(response);
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
    //console.log(this.product);
  }

}
