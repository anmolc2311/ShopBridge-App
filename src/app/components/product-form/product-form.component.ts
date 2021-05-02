import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/helpers/constants/constants';
import { LocalService } from 'src/app/helpers/services/local.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  subs = new SubSink()
  productForm: FormGroup;
  categories: string[] = Constants.Categories;
  title: string = "Add";
  productId: any;
  isLogin: boolean = false;
  DashboardPage: string = `/${Constants.ProductDashboard}`;
  product: any;

  get f() {
    return this.productForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    if (!!localStorage.getItem('isLogin')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9.]*$")]],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      color: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get("id");
    })
    if (this.productId) {
      this.title = "Edit";
      this.getProductById(this.productId);
    } else {
      this.title = "Add";
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getProductById(id) {
    const url = `${environment.apiBaseUrl}/products/${id}`;
    this.localService.get(url).subscribe(res => {
      this.product = res;
      console.log(this.product);
      this.productForm.patchValue({
        name: this.product.name,
        category: this.product.category,
        price: this.product.price,
        quantity: this.product.quantity,
        color: this.product.color,
        description: this.product.description
      })
    }, (err) => {
      console.error(err);
    })
  }

  submitProduct() {
    const payload = {
      name: this.f.name.value,
      category: this.f.category.value,
      price: this.f.price.value,
      quantity: this.f.quantity.value,
      color: this.f.color.value,
      description: this.f.description.value,
    }
    if (this.productId) {
      const url = `${environment.apiBaseUrl}/products/${this.productId}`;
      this.localService.put(url, payload).subscribe(res => {
        window.alert('Product updated successfully.');
        this.productForm.reset();
        this.router.navigate([`/${Constants.ProductDashboard}`]);
      })
    } else {
      const url = `${environment.apiBaseUrl}/products`;
      this.localService.post(url, payload).subscribe(res => {
        window.alert('Product added successfully.');
        this.productForm.reset();
      });
    }
  }


}
