import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!!localStorage.getItem('isLogin')) {
      return true;
    } else {
      window.alert("Accedd denied, please login first.");
      this.router.navigate([`/${Constants.LoginPage}`]);
      return false;
    }

  }

}
