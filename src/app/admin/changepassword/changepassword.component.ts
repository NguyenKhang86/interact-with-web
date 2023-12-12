import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  providers: [LoadefaultService]
})
export class ChangepasswordComponent {
  
  changePasswordForm!: FormGroup;
  
  constructor(
    private toastr: ToastrService,
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
  ) {}

  ngOnInit(): void {
    this.loadScript();  
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: ['']
    })
  }
  public changePassword() {
    this.ever.put('Account/ChangePassword', this.changePasswordForm.value).subscribe( res => {
      if (res.status == false) {
        this.toastr.error('Mật khẩu không chính xác, xin vui lòng thử lại !')
      } else {
        window.location.href = 'service-getbyplatfrom';
      }
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