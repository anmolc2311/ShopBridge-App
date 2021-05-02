import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private loginSource = new BehaviorSubject(false);
  isLogin = this.loginSource.asObservable();

  constructor(
    private http: HttpClient,
    private title: Title
  ) { }

  setLogin(value: boolean) {
    this.loginSource.next(value)
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  get(url: string, options: object = {}): Observable<any> {
    if (Object.keys(options).length > 0) {
      const headerOption = {
        headers: new HttpHeaders({ ...options })
      }
      return this.http.get(url, headerOption);
    } else {
      return this.http.get(url);
    }
  }

  post(url: string, payload: any, options: object = {}) {
    if (Object.keys(options).length > 0) {
      const headerOption = {
        headers: new HttpHeaders({ ...options })
      }
      return this.http.post(url, payload, headerOption);
    } else {
      return this.http.post(url, payload);
    }
  }

  put(url: string, payload: any, options: object = {}) {
    if (Object.keys(options).length > 0) {
      const headerOption = {
        headers: new HttpHeaders({ ...options })
      }
      return this.http.put(url, payload, headerOption);
    } else {
      return this.http.put(url, payload);
    }
  }

  delete(url: string, options: object = {}) {
    if (Object.keys(options).length > 0) {
      const headerOption = {
        headers: new HttpHeaders({ ...options })
      }
      return this.http.delete(url, headerOption);
    } else {
      return this.http.delete(url);
    }
  }

  parseNumber(value) {
    let x = Number(value);
    return x?.toFixed(2);
  }

  parseAmount(amt) {
    let x = amt;
    x = x.toString();
    let afterPoint = '';
    if (x.indexOf('.') > 0)
      afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res;
  }
}
