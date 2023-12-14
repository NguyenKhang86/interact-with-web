import { DOCUMENT } from '@angular/common';
import { Block } from '@angular/compiler';
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

  statuscolor!: string;
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
   
    // trang thai don hang
    this.ever.get('Order').subscribe( res => {
      this.lichsumuahang = res
      // const list = res;
      // console.log(list.join());
      
      let statuscolor = res[0].status;
      if (statuscolor == 1) {
        alert('1')
      } else if (statuscolor == 2) {
        alert('2')
      } else if (statuscolor == 3) {
        console.log('3');
      } else if (statuscolor == 4) {
        // console.log('4');
      }
    });
  }

  myColor() {
    // let mycolor = ['Thành Công','Đang SỬ Lý', 'Đã Hủy'];
    // let statuscolor = document.getElementById('#myColor');
    // console.log(statuscolor);
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

