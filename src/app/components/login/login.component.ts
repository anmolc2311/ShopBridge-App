import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/helpers/constants/constants';
import { LocalService } from 'src/app/helpers/services/local.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  subs = new SubSink();
  isPwd: boolean = true;

  userLogin:FormGroup;

  get l() {
    return this.userLogin.controls;
  }
  
  constructor(
    private fb: FormBuilder,
    private localService:LocalService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.userLogin = this.fb.group({
      uname: ['', [Validators.required]],
      upass: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  checkLogin(){
    const uname = this.userLogin.value.uname;
    const upass = this.userLogin.value.upass;
    const url = `${environment.apiBaseUrl}/logins`;
    this.localService.get(url).subscribe(res => {
      const user = res.find(u => u.uname == uname && u.upass == upass);
      if(user){
        this.localService.setLogin(true);
        localStorage.setItem('isLogin','true');
        this.router.navigate([`/${Constants.ProductDashboard}`]);
      }else{
        window.alert("Invalid username or password.");
        this.userLogin.reset();
      }
    },(err) => {
      console.error(err);
    });
  }

}
