import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';

import { AdminComponent } from './admin/admin.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { BuyProductResolverService } from './_services/buy-product-resolver.service';
 
import { ProductResolveServiceService } from './_services/product-resolve-service.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'addNewProduct', component: AddNewProductComponent, canActivate:[AuthGuard], data:{roles:['Admin']},
    resolve: {
      product: ProductResolveServiceService
    }
  },
  { path: 'showProductDetails', component: ShowProductDetailsComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'productViewDetails', component: ProductViewDetailsComponent, resolve: {product: ProductResolveServiceService}},
  { path: 'buyProduct', component: BuyProductComponent, canActivate:[AuthGuard],data:{roles:['User'] },
    resolve:{
      producDetails: BuyProductResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
