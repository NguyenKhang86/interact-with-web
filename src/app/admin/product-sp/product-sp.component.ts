import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceDonGia, ServiceGetByPlatfrom, UserProfile } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-product-sp',
  templateUrl: './product-sp.component.html',
  styleUrls: ['./product-sp.component.css'],
  providers: [LoadefaultService]
})
export class ProductSpComponent {
  
  username!: string;
  servicegetby!: ServiceGetByPlatfrom[];
  servicedongia!: ServiceDonGia[];
  userprofile!: UserProfile[];
  
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

    this.ever.get('Service/GetByPlatfrom').subscribe( res => {
      this.servicegetby = res;
    })

    this.ever.get('Service').subscribe( res => {
      this.servicedongia = res;
    })

    this.ever.get('Account/Info').subscribe( res => {
      this.userprofile = res
    })

  }


  // nhúng
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
