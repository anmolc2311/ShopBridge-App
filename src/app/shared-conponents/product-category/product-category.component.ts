import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  @Input() title:string;
  @Input() categories:any;
  @Output() categoryEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  // pass category to parent component
  emitCategory(value){
    this.categoryEvent.emit(value);
  }

}
