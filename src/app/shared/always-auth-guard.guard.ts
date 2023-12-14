import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from "@angular/router";
import { ApiDataservice } from '../service/api-dataservice';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AlwaysAuthGuardGuard implements CanActivate, CanActivateChild {

  constructor(
    private toastr: ToastrService,
    private ever: ApiDataservice, 
    private router: Router
    ) {}
  
  canActivate() {
    let rolecooki = this.ever.getCookie(ApiDataservice.RoleCookieName);
    let authguard = rolecooki;  
    
    if (authguard == '2') {
      return true;
    } else {
      alert("Bạn không có quyền xem trang này");
      this.router.navigate(['login'])
      // window.location.href = 'login';  
      return false;
    }
  }
  canActivateChild() {
    console.log('canActivateChild');
    return true;
  }
  
}
