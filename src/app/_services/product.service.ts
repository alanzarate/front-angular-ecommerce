import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  destinationUrl:string = 'http://localhost:9090';

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>(this.destinationUrl+"/addNewProduct", product);
  }

  public getAllProducts(){
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts");
  }

  public deleteProduct(productId: number){
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }
  public getProductDetailsById(productId: number){
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
  }
  public getProductDetails(isSingleProductCheckout:any, productId:number){
     
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails){
    return this.httpClient.post(this.destinationUrl + '/placeOrder', orderDetails);
  }
}
