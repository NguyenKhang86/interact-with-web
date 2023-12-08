import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild} from "@angular/router";
import { ApiDataservice } from '../service/api-dataservice';

@Injectable({
  providedIn: 'root'
})
export class AlwaysAuthGuardGuard implements CanActivate, CanActivateChild {
  role: string = '';
  constructor(private ever: ApiDataservice) {}
  canActivate() {
    console.log(ApiDataservice.AccessRole);
    let rolecooki = ApiDataservice.AccessRole
    
    if (rolecooki == this.role) {
      alert('hello')
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
