import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ProjectsComponent implements OnInit {

  isLoading = false;
  state: string = '';

  constructor() {
    this.isLoading = true;
    this.isLoading = false;
  }

  ngOnInit() {
  }

}
