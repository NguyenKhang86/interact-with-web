import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2 } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoadefaultService {
  
    constructor( private renderer2: Renderer2, @Inject(DOCUMENT) private _document : any) {}

    ngOnInit(): void {
      document.body.setAttribute('data-bs-spy', 'scroll');
      document.body.setAttribute('data-bs-target', '.sticky');
      document.body.setAttribute('data-bs-offset', '70');
      this.loadBody();
      this.loadScript();
      this.loadCss();
    }

      loadBody() {
        document.body.setAttribute('class', 'loading');
      }
    
      loadCss() {
        const styles = [
          'assets/css/bootstrap.min.css',
          'assets/css/app.min.css',
          'assets/css/icons.min.css' 
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
          'assets/js/vendor.min.js',
          "assets/libs/parsleyjs/parsley.min.js",
          "assets/js/pages/form-validation.init.js",
          'assets/js/app.min.js'
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
