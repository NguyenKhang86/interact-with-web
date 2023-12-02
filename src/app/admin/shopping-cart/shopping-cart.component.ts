import { Component } from '@angular/core';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [LoadefaultService]

})
export class ShoppingCartComponent {
  constructor(private load: LoadefaultService) {}
  ngOnInit(): void {
    this.load.loadBody();
    this.load.loadCss();
    this.load.loadScript();
  }
  add() {}
}
