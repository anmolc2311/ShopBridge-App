import { Component, Input, OnInit } from '@angular/core';
import { LocalService } from 'src/app/helpers/services/local.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;
  @Input() ViewDetailPageUrl: any;
  
  constructor(
    private localService: LocalService
  ) { }

  ngOnInit(): void {
  }

  // format price
  getCurrency(v) {
    if (v) {
      const parseValToNo = this.localService.parseNumber(v);
      return this.localService.parseAmount(parseValToNo);
    }
  }

}
