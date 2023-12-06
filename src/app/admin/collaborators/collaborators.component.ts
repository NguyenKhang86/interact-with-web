import { Component } from '@angular/core';
import { LoadefaultService } from 'src/app/service/loadefault.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css'],
  providers: [LoadefaultService]

})
export class CollaboratorsComponent {
  constructor(
    private load: LoadefaultService,
    ) {}
  ngOnInit(): void {
 
  }
}
