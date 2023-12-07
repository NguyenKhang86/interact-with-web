import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild} from "@angular/router";
import { LoginComponent } from '../home/login/login.component';
import { ApiDataservice } from '../service/api-dataservice';

@Injectable({
  providedIn: 'root'
})
export class AlwaysAuthGuardGuard implements CanActivate, CanActivateChild {
  role: number = 0;
  constructor(private lo: ApiDataservice) {}
  canActivate() {
    console.log("canActivate");
    if (this.role == 0) {
      alert(ApiDataservice.AccessTokenJwt)
      return true;
    } else {
      window.alert("Bạn không có quyền xem trang này");
      window.location.href = 'login';
      return false;
    }
  }
  canActivateChild() {
    console.log('canActivateChild');
  return true;
  }
  
}
