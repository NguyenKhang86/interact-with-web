import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private renderer2: Renderer2, @Inject(DOCUMENT) private _document : any,
    private ever: ApiDataservice,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    document.body.setAttribute('data-bs-spy', 'scroll');
    document.body.setAttribute('data-bs-target', '.sticky');
    document.body.setAttribute('data-bs-offset', '70');
    this.loadScript();
    this.loadCss();

    
    this.registerF = this.formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      platfrom: ['app']
    })
  }

  register() {
    this.ever.post('Account/Register', this.registerF.value).subscribe( res => {
      console.log(res);
      // if (res.status == false) {
      //   alert('Tên đăng nhập đã được sử dụng, xin vui lòng thử lại !')
      // } else {
      //   this.ever.setCookie(ApiDataservice.CookieName,res.data,30,"/");
      //   localStorage.setItem('username', this.loginF.value.username);
      //   alert('Đăng ký thành công, chuyển sang trang đăng nhập.')
      //   window.location.href = 'login';
      // }
    })
  }

  loadBody() {
    document.body.setAttribute('class', 'loading');
  }
  
  private loadCss() {
    const styles = [
      'assets/default/css/bootstrap.min.css',
      'assets/default/css/app.min.css',
      'assets/default/css/icons.min.css' 
    ];
    
    for (const style of styles) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', style);
      document.head.appendChild(link);
    }
  }
  
  private loadScript() {
    const scripts = [
      'assets/default/js/vendor.min.js',
      'assets/default/libs/parsleyjs/parsley.min.js',
      'assets/default/js/pages/form-validation.init.js',
      'assets/default/js/app.min.js'
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
