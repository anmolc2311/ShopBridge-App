import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/constants/constants';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  Homepage:string = `/${Constants.HomePage}`;
  
  constructor() { }

  ngOnInit(): void {
  }

}
