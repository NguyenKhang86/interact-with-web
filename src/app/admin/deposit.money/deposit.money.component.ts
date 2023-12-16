import { Component } from '@angular/core';
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

  destroy!: any;  processing!: any;  success!: any; withdrawmoney!: any; bankmoney!: any;
  statuscolor!: string;  username!: string;
  userprofile!: UserProfile;
  lichsumuahang!: lichsumuahang[];
  moneybank!: Transaction01[];
  
  constructor( private ever: ApiDataservice ) {}
    
  ngOnInit(): void {
    this.userprofile = new UserProfile;
    this.username = localStorage.getItem('username') || '';
    this.GetAccountInfo();
    this.GetAccountTransaction();
   
    // trang thai don hang
    this.ever.get('Order').subscribe( res => {
      this.lichsumuahang = res

      let statuscolor = res[0].status;
      if (statuscolor == 1) {
        // alert('1')
      } else if (statuscolor == 2) {
        this.destroy = true;
      } else if (statuscolor == 3) {
        this.processing = true;
      } else if (statuscolor == 4) {
        this.success = true;
      }
    });
  }
  Delete() {}
  private GetAccountTransaction() {
    // lich su nap rut~
    this.ever.get('Account/Transaction').subscribe( res => {
      this.moneybank = res
      let money = res[0].action;
      if (money == "rut") {
        this.bankmoney = true;
      } else if(money == "nap"){
        this.withdrawmoney = true;
      }
    })
  }
  private GetAccountInfo() {
    // thông tin cá nhân
    this.ever.get('Account/Info').subscribe( res => {
      this.userprofile = res;
    })
  }
}

