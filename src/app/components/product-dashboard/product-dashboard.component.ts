import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/constants/constants';
import { LocalService } from 'src/app/helpers/services/local.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {

  subs = new SubSink();
  products: any[] = [];
  searchText: string = "";
  perPage: number = 5;
  p: number = 1;
  AddProductPage: string = `/${Constants.AddProduct}`;
  EditProductPage: string = `/${Constants.EditProduct}`;
  ProductDetailPage: string = `/${Constants.ProductDetails}`;
  constructor(
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getAllProducts() {
    const url = `${environment.apiBaseUrl}/products`;
    this.localService.get(url).subscribe(res => {
      this.products = res.map((p, i) => ({ ...p, srNo: i + 1 }));
    }, (err) => {
      console.error(err);
    });
  }

  // delete product
  deleteProduct(p) {
    if (confirm(`Are you sure to delete ${p.name}?`)) {
      console.log('1');
      const url = `${environment.apiBaseUrl}/products/${p.id}`;
      this.localService.delete(url).subscribe(res => {
        window.alert(`${p.name} is deleted successfully.`);
        this.searchText = "";
        this.getAllProducts();
      }, (err) => {
        console.error(err);
      })
    }
  }

  // reset page no
  resetPageNo() {
    this.p = 1;
  }

  // format price
  getCurrency(v) {
    if (v) {
      const parseValToNo = this.localService.parseNumber(v);
      return this.localService.parseAmount(parseValToNo);
    }
  }
}
