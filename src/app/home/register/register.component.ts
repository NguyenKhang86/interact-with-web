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
      if (res.status == false) {
        this.toastr.success('Đăng Kí Thất bại Xin Vui Lòng Thử Lại.');
      } else {
        window.location.href = 'login';
      }
    })
  }

  private loadScript() {
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
