import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Transaction01, UserProfile, lichsumuahang } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit.money.component.html',
  styleUrls: ['./deposit.money.component.css'],
  providers: [LoadefaultService]
})
export class DepositMoneyComponent {

  username!: string;
  userprofile!: UserProfile;
  lichsumuahang!: lichsumuahang[];
  moneybank!: Transaction01[];
  
  constructor(
    private ever: ApiDataservice ) {}

  ngOnInit(): void {
    this.userprofile = new UserProfile;
    this.username = localStorage.getItem('username') || '';
    this.GetAccountInfo();
    this.GetAccountTransaction();
   
    // trang thai daon hang
    this.ever.get('Order').subscribe( res => {
      if (res.status == 0) {
        
      }
      this.lichsumuahang = res
    })

  }


  Delete() {}
  private GetAccountTransaction() {
    // lich su nap rut
    this.ever.get('Account/Transaction').subscribe( res => {
      this.moneybank = res
    })
  }
  private GetAccountInfo() {
    // thông tin cá nhân
    this.ever.get('Account/Info').subscribe( res => {
      this.userprofile = res;
    })
  }
}

