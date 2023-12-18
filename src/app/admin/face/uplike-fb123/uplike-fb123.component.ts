import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Menu } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';

@Component({
  selector: 'app-uplike-fb123',
  templateUrl: './uplike-fb123.component.html',
  styleUrls: ['./uplike-fb123.component.css']
})
export class UplikeFb123Component {

  fblike!: any; dongia!: any;
  a!: any; b!: any;
  tokken!: string;
  tongthanhtoan!: number;
  soluong!: number;
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
      this.ever.get(`Id?Id=${red[0].service[0].id}`).subscribe( res => {
        this.Orderform1 = this.formBuilder.group({
          id: [''],
          sid: [res.id],
          url: [''],
          quantity: 100,
        })
      })
      this.fblike = red[0].service[0].title;
      this.dongia = red[0].service[0].price;
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
      alert('Bạn Muốn Đăng Nhập Để Tiếp Tục')
      window.location.href = 'login';
    } else {
      this.ever.post('Order/Add', this.Orderform1.value).subscribe( red => {
        if (red.status == false) {
          this.toastr.error('Nội Dung Không Hợp Lệ, Xin Vui Lòng Thử lại.')
        } else if (this.soluong >= 1000) {
          this.toastr.error('Đơn Hàng Quá Lớn, Xin Vui Lòng Nhập Lại.')
        } else {
          this.toastr.success('Thanh Toán Thành Công.')
          this.GetAccountMenuID();
        } 
      })
    }
  }
}
