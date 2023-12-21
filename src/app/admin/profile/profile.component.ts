import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [LoadefaultService]
})
export class ProfileComponent implements OnInit{

  kientra!: string;
  username!: string;
  profileeditform!: FormGroup;
  userprofile!: UserProfile;
  changePasswordForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.userprofile = new UserProfile;
    this.profileGet();
    this.loadScript();  
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: ['']
    })
    this.profileeditform = this.formBuilder.group({
      fullname: [''], 
      address: [''],
      gender: [''],
      phone: [''],
      money: 0,
    })    
    // check thông tin cá nhân
    this.checklogin()
  }

  onEditClick() {
    this.ever.get('Account/Info').subscribe( res => {
      this.profileeditform = this.formBuilder.group({
        fullname: [res.fullname],
        gender: [res.gender],
        phone: [res.phone],
        address: [res.address]
      })
    })
  }
  profileGet(){
    this.ever.get('Account/Info').subscribe( res => {
      this.userprofile = res;
   })
  }
  profileedit() {
    this.ever.put('Account/Edit', this.profileeditform.value).subscribe( res => {
      if (res.status == false) {
        alert('Thay đổi thông tin thất bại, xin vui lòng thử lại !')
      } else {       
        this.profileGet();
      }
    })
  }
  Delete() {}

  checklogin() {
    this.kientra = this.ever.getCookie(ApiDataservice.CookieName);
    if (this.kientra == '') {
      window.location.href = 'login';
    } 
  }
  public changePassword() {
    this.ever.put('Account/ChangePassword', this.changePasswordForm.value).subscribe( res => {
      if (res.status == false) {
        this.toastr.error('Mật khẩu không chính xác,  xin vui lòng thử lại !.')
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
