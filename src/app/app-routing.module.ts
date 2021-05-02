import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { Constants } from './helpers/constants/constants';
import { AuthGuard } from './helpers/guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: Constants.HomePage, pathMatch: "full"
  },
  {
    path: Constants.HomePage, component: HomepageComponent, pathMatch: "full",	data: { title: 'ShopBridge - HomePage'}
  },
  {
    path: Constants.LoginPage, component: LoginComponent, pathMatch: "full",data: { title: 'ShopBridge - Login'}
  },
  {
    path: Constants.ProductDashboard, component: ProductDashboardComponent,canActivate:[AuthGuard], pathMatch: "full",data: { title: 'ShopBridge - Dashboard'}
  },
  {
    path: `${Constants.ProductDetails}/:id`, component: ProductDetailComponent, pathMatch: "full", data: { title: 'ShopBridge - Product Details'}
  },
  {
    path: Constants.AddProduct, component: ProductFormComponent,canActivate:[AuthGuard],pathMatch: "full",data: { title: 'ShopBridge - Add Product'}
  },
  {
    path: `${Constants.EditProduct}/:id`, component: ProductFormComponent,canActivate:[AuthGuard],pathMatch: "full",data: { title: 'ShopBridge - Edit Product'}
  },
  {
    path: Constants.NotFound, component: PageNotFoundComponent,data: { title: 'ShopBridge - Page Not Found'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
