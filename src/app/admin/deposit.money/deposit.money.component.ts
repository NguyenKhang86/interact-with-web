import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transaction01, UserProfile, lichsumuahang } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit.money.component.html',
  styleUrls: ['./deposit.money.component.css'],
  providers: [LoadefaultService]
})
export class DepositMoneyComponent {

  username!: string;
  profileeditform!: FormGroup;
  userprofile!: UserProfile[];
  lichsumuahang!: lichsumuahang[];
  maney!: Transaction01[];
  
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
    this.loadCss();
    this.username = localStorage.getItem('username') || '';

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
    // lich su nap rut
    this.ever.get('Account/Transaction').subscribe( res => {
      this.maney = res
    })
    // trang thai daon hang
    this.ever.get('Order').subscribe( res => {
      if (res.status == 0) {
        
      }
      this.lichsumuahang = res
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

