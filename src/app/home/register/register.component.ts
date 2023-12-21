import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ApiDataservice]
})
export class RegisterComponent implements OnInit{
  
  public registerF!: FormGroup;
  
  constructor(
    private toastr: ToastrService,
    private renderer2: Renderer2, @Inject(DOCUMENT) private _document : any,
    private ever: ApiDataservice,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadScript();
    this.registerF = this.formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      platfrom: ['web']
    })
  }

  register() {
    this.ever.post('Account/Register', this.registerF.value).subscribe( res => {
      if (res.data == 101) {
        this.toastr.error('Tên đăng nhập đã được sử dụng.');
      } else  if (res.data == 102) {
        this.toastr.error('Email đã được sử dụng.');
      }  else  if (res.data == 103) {
        this.toastr.error('Email không đúng định dạng.');
      } else  if (res.data == 104) {
        this.toastr.error('Tài khoản đang bị cấm đăng nhập.');
      } else  if (res.data == 105) {
        this.toastr.error('Đăng ký với Platfrom không đúng.');
      } else {
        window.location.href = 'login';
      }
    })
  }
  private loadScript() {
    const scripts = [
      "assets/libs/parsleyjs/parsley.min.js",
      "assets/js/pages/form-validation.init.js",
      "assets/js/app.min.js"
    ];
    for (const item of scripts) {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = item;
      const body = this._document.getElementsByTagName('body')[0];
      this.renderer2.appendChild(body, script);
    }
  }
}
