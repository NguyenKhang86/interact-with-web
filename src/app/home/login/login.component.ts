import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiDataservice } from 'src/app/service/api-dataservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiDataservice]
})
export class LoginComponent {
  
  public loginF!: FormGroup;
  role!: number;
  
  constructor(
    private toastr: ToastrService,
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
  ) {}

  ngOnInit(): void {
    this.loadScript();
    this.loginF = this.formBuilder.group({
      username: [''],
      password: [''],
      platfrom: ['web']
    })
  }
  get f() {
    return this.loginF.controls;
  }
  onSubmit() {
    this.ever.post('Account/login', this.loginF.value).subscribe( res => {
      if (res.status == false) {
        this.toastr.error('Tài Khoản Hoặc Mật Khẩu Sai, Xin Vui Lòng Thử lại.')
      } else {
        this.ever.setCookie(ApiDataservice.CookieName,res.data,30,"/");
        localStorage.setItem('username', this.loginF.value.username);
        window.location.href = 'service-getbyplatfrom';
      }
      this.ever.setCookie(ApiDataservice.RoleCookieName,res.role,30,"/");
    })
  }

  public loadScript() {
    const scripts = [
      "assets/libs/parsleyjs/parsley.min.js",
      "assets/js/pages/form-validation.init.js",
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