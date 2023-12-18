import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Menu, UserProfile } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  styleUrls: ['./adminhomepage.component.css'],
  providers: [LoadefaultService]
})
export class AdminhomepageComponent implements OnInit{

  shouldDisplay: boolean = true;
  login!: any; 
  tokken!: string;
  username!: string;
  Menuform!: FormGroup;
  menu!: Menu[];
  userprofile!: UserProfile;
  
  constructor( 
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
   ) {}
  ngOnInit(): void {
    this.userprofile = new UserProfile;
    this.loadScript();
    this.GetAccountMenu();
    this.GetAccountInfo();
    this.tokken = this.ever.getCookie(ApiDataservice.CookieName);
    if (this.tokken == "") {
      this.login = true;
    }
  }
  hide(): void {
    this.shouldDisplay = false;
  }
  show(): void {
    this.shouldDisplay = true;
  }
  // hideDiv(div: { style: { display: string; }; }) { div.style.display = "none";}
  public GetAccountMenu() {
    this.ever.get('Account/Menu').subscribe( res => {
      this.menu = res;
    })
  }
  logout() {
    this.ever.deleteCookie(ApiDataservice.CookieName)
    window.location.href = "/";
  }
  public GetAccountInfo() {
    // thông tin cá nhân
    this.ever.get('Account/Info').subscribe( res => {
      this.userprofile = res;
    })
  }
  loadScript() {
    const scripts = [
      "/assets/libs/parsleyjs/parsley.min.js",
      // "/assets/js/pages/form-validation.init.js",
      "/assets/js/app.min.js"
    ];
    for (let item of scripts) {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = item;
      const body = this._document.getElementsByTagName('body')[0];
      this.renderer2.appendChild(body, script);
    }
  }
}