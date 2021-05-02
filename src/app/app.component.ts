import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Constants } from './helpers/constants/constants';
import { LocalService } from './helpers/services/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shop-bridge';
  currentYear: any;
  routeData: any;
  HomePage: string = `/${Constants.HomePage}`;
  LoginPage: string = `/${Constants.LoginPage}`;
  DashbobardPage:string = `/${Constants.ProductDashboard}`;
  isLogin:boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localService: LocalService
  ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => {
        this.routeData = route.data;
        return route.data
      })
    ).subscribe((event) => {
      this.localService.updateTitle(event['title']);
    });
  }

  ngOnInit() {
    if(!!localStorage.getItem('isLogin')){
      this.localService.setLogin(true);
    }else{
      this.localService.setLogin(false);
    }
    this.localService.isLogin.subscribe(res => this.isLogin = res);
    this.currentYear = new Date().getFullYear();
  }

  logout(){
    if(confirm(`Are you sure you want to logout?`)){
      localStorage.removeItem('isLogin');
      this.localService.setLogin(false)
      this.router.navigate([`/${Constants.HomePage}`]);
    }
  }
}
