import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transaction, UserProfile } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [LoadefaultService]
})
export class ProfileComponent implements OnInit{

  username!: string;
  profileeditform!: FormGroup;
  Transaction!: FormGroup;
  userprofile!: UserProfile[];
  transaction!: Transaction[];

  constructor(
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
  ) {}

  ngOnInit(): void {
    document.body.setAttribute('data-bs-spy', 'scroll');
    document.body.setAttribute('data-bs-target', '.sticky');
    document.body.setAttribute('data-bs-offset', '70');
    this.loadScript();
    this.loadBody();
    this.loadCss();
    this.username = localStorage.getItem('username') || '';
    
    this.Transaction = this.formBuilder.group({
      id: [''],
      coin: 0,
      paid: 0,
    })

    this.profileeditform = this.formBuilder.group({
      fullname: [''],
      gender: [''],
      phone: [''],
      address: [''],
      coin: [''],
    })

    
    // thông tin cá nhân
    this.ever.get('Account/Info').subscribe( res => {
      this.userprofile = res
    })

    this.ever.post('Account/Transaction/Add', this.Transaction.value).subscribe( res => {
      console.log(res);
      
      // this.Transaction = res
    })
  }

  onEditClick() {
    this.ever.get('Account/Info').subscribe( res => {
      this.profileeditform = this.formBuilder.group({
        fullname: [this.userprofile[0].fullname],
        gender: [this.userprofile[0].gender],
        phone: [this.userprofile[0].phone],
        address: [this.userprofile[0].address]
      })
    })
  }

  profileedit() {
    this.ever.put('Account/Edit', this.profileeditform.value).subscribe( res => {
      if (res.status == false) {
        alert('Thay đổi thông tin thất bại, xin vui lòng thử lại !')
      } else {
        this.ever.setCookie(ApiDataservice.CookieName,res.data,30,"/");
        localStorage.setItem('username', this.profileeditform.value.username);
        alert('Thay đổi thồn tin thành công.')
        window.location.href = 'profile';
      }
    })
  }

  Delete() {}

  // Nhúng
  loadBody() {
    document.body.setAttribute('class', 'loading');
  }
  
  loadCss() {
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
  
  loadScript() {
    const scripts = [
      'assets/default/js/vendor.min.js',
      'assets/default/libs/jquery-tabledit/jquery.tabledit.min.js',
      'assets/default/js/pages/tabledit.init.js',
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

