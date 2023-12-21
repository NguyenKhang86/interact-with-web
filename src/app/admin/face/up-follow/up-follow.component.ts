import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Menu } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';

@Component({
  selector: 'app-up-follow',
  templateUrl: './up-follow.component.html',
  styleUrls: ['./up-follow.component.css']
})
export class UpFollowComponent {
  dongia!: any; facebook!: any; data!: any;
  a!: any; b!: any;
  tongthanhtoan!: number;
  soluong!: number;
  tokken!: string;
  Orderform1!: FormGroup;
  menu!: Menu[];
  
  constructor(
    private toastr: ToastrService,
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.Orderform1 = this.formBuilder.group({
      id: [''],
      sid: [''],
      url: [''],
      quantity: 0,
    })
    this.GetAccountMenuID();
  }
  private GetAccountMenuID() {
    this.ever.get('Account/Menu').subscribe( red => {
      console.log(red);
      
      this.ever.get(`Id?Id=${red[0].service[2].id}`).subscribe( res => {
        this.Orderform1 = this.formBuilder.group({
          id: [''],
          sid: [res.id],
          url: [''],
          quantity: 100,
        })
      })
      this.facebook = red[0].service[2].title;
      this.dongia = red[0].service[2].price; 
    })
  }
  thanhtoan() {
    var a = this.Orderform1.value.quantity;
    this.soluong = a;
    this.tongthanhtoan = this.soluong*this.dongia;
  }
  onSubmitOrder() {
    this.tokken = this.ever.getCookie(ApiDataservice.RoleCookieName);
    if (this.tokken == '') {
      window.location.href = 'login';
    } else {
      this.ever.post('Order/Add', this.Orderform1.value).subscribe( red => {
        this.data = red.data;
        if(this.data == 100) {
          this.toastr.success('Thanh Toán Thành Công.');
          this.GetAccountMenuID();
        } else if(this.data == 200) {
          this.toastr.error('Dịch Vụ Đang Bảo Trì.');
        } else if(this.data == 201) {
          this.toastr.info('Đơn Hàng Phải Lớn Hơn Hoặc Bằng 10.');
        } else if(this.data == 202) {
          this.toastr.info('Tài Khoản Không Đủ Để Thanh Toán.');
        } else if(this.data == 203) {
          this.toastr.info('Đường Link Trống, Vui Lòng Điền Đầy Đủ Thông Tin.');
        }
      })
    }
  }
}
