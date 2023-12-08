import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild} from "@angular/router";
import { ApiDataservice } from '../service/api-dataservice';

@Injectable({
  providedIn: 'root'
})

export class AlwaysAuthGuardGuard implements CanActivate, CanActivateChild {
  constructor(private ever: ApiDataservice) {}
  canActivate() {
    let rolecooki = ApiDataservice.AccessRole
    if (rolecooki == '2') {
      alert('hello')
      return true;
    } else {
      alert("Bạn không có quyền xem trang này");
      window.location.href = 'login';
      return false;
    }
  }
  canActivateChild() {
    console.log('canActivateChild');
    return true;
  }
  
}
