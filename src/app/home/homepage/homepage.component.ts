import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [LoadefaultService]
})
export class HomepageComponent implements OnInit{
  constructor(
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
  ) {}

  ngOnInit(): void {
    this.loadScript();
  }
  loadScript() {
    const scripts = [
      "/assets/libs/parsleyjs/parsley.min.js",
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