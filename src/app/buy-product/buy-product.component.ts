import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternativeContactNumber: '',
    orderProductQuantityList: []
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productDetails=this.activatedRoute.snapshot.data['producDetails'];
    this.productDetails.forEach(
      x=> this.orderDetails.orderProductQuantityList.push({
        productId: x.productId, quantity: 1
      })
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm){
    if(this.orderDetails.fullName != '' &&
      this.orderDetails.fullAddress != '' &&
      this.orderDetails.contactNumber != '' &&
      this.orderDetails.alternativeContactNumber != ''){
      this.productService.placeOrder(this.orderDetails).subscribe(
        (resp) => {
          console.log(resp);
          orderForm.reset();
        },
        (error) =>{
          console.log(error);
        }
      )
    }else{
      
    }
  }

  getQuantityForProduct(productId: number){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: number, discountedPrice: number){
    const filteresProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteresProduct[0].quantity * discountedPrice;
  }
  onQuantityChange(productId: number, quantity: string){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = parseInt(quantity);
 
  }
  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price= this.productDetails.filter( product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal +  price * productQuantity.quantity;
      }
    );
    return grandTotal;

  }

}
