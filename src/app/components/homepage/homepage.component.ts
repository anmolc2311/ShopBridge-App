import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/constants/constants';
import { LocalService } from 'src/app/helpers/services/local.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  subs = new SubSink();
  categories: string[] = Constants.Categories;
  allProducts: any;
  initialProducts: any;
  isViewAll = true;
  ProductDetailPage: string = `/${Constants.ProductDetails}`;

  constructor(
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    this.getProducts('all');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // get products by category
  getProducts(value) {
    if (value != 'all') {
      const url = `${environment.apiBaseUrl}/products?category=${value}`;
      this.localService.get(url).subscribe(res => {
        this.allProducts = res;
        this.allProducts.length > 6 ? this.isViewAll = true : this.isViewAll = false;
        this.initialProducts = this.allProducts.filter((p, i) => i < 6);
      }, (err) => {
        console.error(err);
        window.alert(err);
      })
    } else if (value == 'all') {
      const url = `${environment.apiBaseUrl}/products`;
      this.localService.get(url).subscribe(res => {
        this.allProducts = res;
        this.allProducts.length > 6 ? this.isViewAll = true : this.isViewAll = false;
        this.initialProducts = this.allProducts.filter((p, i) => i < 6);
      }, (err) => {
        console.error(err);
      })
    }

  }

  // view all products
  viewAllProducts() {
    this.initialProducts = [];
    this.initialProducts = this.allProducts;
    this.isViewAll = false;
  }

}
