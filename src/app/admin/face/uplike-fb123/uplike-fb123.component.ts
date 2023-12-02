import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Menu, ServiceId } from 'src/app/model/access';
import { ApiDataservice } from 'src/app/service/api-dataservice';

@Component({
  selector: 'app-uplike-fb123',
  templateUrl: './uplike-fb123.component.html',
  styleUrls: ['./uplike-fb123.component.css']
})
export class UplikeFb123Component {

  a!: any;
  b!: any;
  tongthanhtoan!: number;
  soluong!: number;
  Orderform1!: FormGroup;
  menu!: Menu[];
  idfaccelike!: ServiceId[];
  pricefaccelike!: ServiceId[];
  titlefaccelike!: ServiceId[];
  
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

    this.Orderform1 = this.formBuilder.group({
      id: [''],
      sid: [''],
      url: [''],
      quantity: 0,
    })

    this.ever.get('Account/Menu').subscribe( res => {
      this.ever.get(`Id?Id=${res[0].service[0].id}`).subscribe( res => {
        // console.log(res);
        this.Orderform1 = this.formBuilder.group({
          id: [''],
          sid: [res.id],
          url: [''],
          quantity: 100,
        })
        this.b = res.price;
        // this.a = this.Orderform1.value.quantity;
        // this.tongthanhtoan = this.soluong*this.b;

        this.pricefaccelike = res.price;
        this.titlefaccelike = res.title;
      })
    })
  } 

  thanhtoan() {
    var a = this.Orderform1.value.quantity;
    this.soluong = a;
    this.tongthanhtoan = this.soluong*this.b;
  }

  onSubmitOrder() {
    this.ever.post('Order/Add', this.Orderform1.value).subscribe( red => {
      if (red.status == false) {
        alert('Mời Nhập Đầy Đủ Thông Tin')
      } else {
        alert('hello')
        window.location.href = 'Facebook-like';
      } 
    })
  }

//  nhúng
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
