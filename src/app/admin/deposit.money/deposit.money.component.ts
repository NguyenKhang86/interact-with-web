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

  // Số trang hiện tại
  page: number = 1;
  count: number = 0;
  tableSize: number = 0; 
  // Số lượng mục hiển thị trên một trang
  tableSizes: any = [1,2,3,4,5, 10, 15, 20]; 

  forconfirmation!: boolean;  confirming!: boolean;  illegal!: boolean; orderbig!: boolean; success!: boolean;
  username!: string;
  userprofile!: UserProfile;
  lichsumuahang!: lichsumuahang[];
  moneybank!: Transaction01[];
  bankmoney!: boolean;
  withdrawmoney!: boolean;
  pageSize: any;
  
  constructor( private ever: ApiDataservice ) {}
    
  ngOnInit(): void {
    this.userprofile = new UserProfile;
    this.username = localStorage.getItem('username') || '';
    this.GetAccountInfo();
    this.GetAccountTransaction();
    this.GetOrder();
  }

  // phân trang
  paginationOrder(event: number): void {
    this.page = event;
    this.GetOrder();
    this.GetAccountTransaction();
  }
  // số lượng hiển thị
  handlePageSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.GetOrder();
    this.GetAccountTransaction();
  }
  Delete() {}

  GetOrder() {
    // trang thai don hang
    this.ever.get('Order').subscribe( res => {
      this.lichsumuahang = res
      if (res[0].status == 0) {
        this.forconfirmation = true;
      } else if (res[0].status == 1) {
        this.confirming = true;
      } else if (res[0].status == 2) {
        this.illegal = true;
      } else if (res[0].status == 3) {
        this.orderbig = true;
      } else if (res[0].status == 4) {
        this.success = true;  
      }
    });
  }
  private GetAccountTransaction() {
    // lich su nap rut
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

