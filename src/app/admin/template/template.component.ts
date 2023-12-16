import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiDataservice } from 'src/app/service/api-dataservice';
import { Chart,registerables} from 'chart.js';
import { UserProfile } from 'src/app/model/access';
Chart.register(...registerables)

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  providers: []
})
export class TemplateComponent implements OnInit{

  userprofile!: UserProfile;

  constructor(
    private toastr: ToastrService,
    private ever: ApiDataservice,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document : any
  ) {}
  ngOnInit(): void {
    this.userprofile = new UserProfile;
    this.myChart();
    this.piechart();
    this.GetAccountInfo();
  }
  public GetAccountInfo() {
    // thông tin cá nhân
    this.ever.get('Account/Info').subscribe( res => {
      this.userprofile = res;
    })
  }
  myChart() {
    const myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: ['Tháng/Năm','8/2023','9/2023','10/2023','11/2023','12/2023','1/2024','2/2024'],
        datasets: [{
          data: [65, 59, 80, 81, 56, 55, 40, 50],
          fill: false,
          borderColor: ['rgb(75, 192, 192)'],
        }]
      }
    })
  }
  piechart() {
    const piechart = new Chart('piechart', {
        type: 'doughnut',
        data: {
            labels: ['Còn Trống', 'Đã Chạy'],
            datasets: [{
                data: ['800','200'],
                backgroundColor: [ '#0056C1', '#04AA6D' ],
                hoverBorderWidth: 10
            }
          ],
        },
        
    });
  }
  public loadScript() {
    const scripts = [
      // "assets/js/vendor.min.js",
      "assets/js/app.min.js",
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