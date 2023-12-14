import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Menu, ServiceDonGia,  UserProfile } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-product-sp',
  templateUrl: './product-sp.component.html',
  styleUrls: ['./product-sp.component.css'],
  providers: [LoadefaultService]
})
export class ProductSpComponent {
  
  fullname!: string; gender!: string; phone!: string; address!: string; username!: string; money!: 0;
  menu!: Menu[];
  service!: ServiceDonGia[];
  userprofile!: UserProfile;
  
  constructor( private ever: ApiDataservice ) {}

  ngOnInit(): void {
    this.userprofile = new UserProfile;
    this.AccountMenu();
    this.ServiceGet();
    this.GetAccountInfo();
    this.username = localStorage.getItem('username') || '';
  }
  private ServiceGet() {
    this.ever.get('Service').subscribe( res => {
      this.service = res;
    })
  }
  private AccountMenu() {
    this.ever.get('Account/Menu').subscribe( res => {
      this.menu = res;
    })
  }
  private GetAccountInfo() {
    // thông tin cá nhân
    this.ever.get('Account/Info').subscribe( res => {
      this.userprofile = res;
      console.log(res);
      
    })
  }
}
