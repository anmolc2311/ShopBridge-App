import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/helpers/constants/constants';
import { LocalService } from 'src/app/helpers/services/local.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  subs = new SubSink();
  DashboardPage:string = `/${Constants.ProductDashboard}`;
  EditProductPage:string = `/${Constants.EditProduct}`;
  productId:any;
  product:any;
  isLogin:boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private localService:LocalService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(!!localStorage.getItem("isLogin")){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get("id");
    });
    this.getProductById(this.productId);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // get product by productId
  getProductById(id){
    const url = `${environment.apiBaseUrl}/products/${id}`;
    this.localService.get(url).subscribe(res => {
      this.product = res;
    },(err) => {
      console.log(err);
      this.router.navigate([`/${Constants.HomePage}`]);
    })
  }

  // format price
  getCurrency(v) {
    if (v) {
      const parseValToNo = this.localService.parseNumber(v);
      return this.localService.parseAmount(parseValToNo);
    }
  }

}
