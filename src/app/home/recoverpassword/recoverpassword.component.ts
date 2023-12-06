import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiDataservice } from 'src/app/service/api-dataservice';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.css'],
  providers: [ApiDataservice]

})
export class RecoverpasswordComponent {
 
  public loginF!: FormGroup;
  
  constructor(
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
  ) {}

  ngOnInit(): void {
    this.loadScript();
    this.loginF = this.formBuilder.group({
      email: [''],
      platfrom: ['web']
    })
  }
  onSubmit() {

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