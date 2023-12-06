import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  profileeditform!: FormGroup;
  userprofile!: UserProfile;

  constructor(
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
  ) {}

  ngOnInit(): void {
    this.userprofile = new UserProfile;
    this.profileGet();
    this.profileeditform = this.formBuilder.group({
      fullname: [''], 
      address: [''],
      gender: [''],
      phone: [''],
      money: 0,
    })    
    // thông tin cá nhân
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
}

