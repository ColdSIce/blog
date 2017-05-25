import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-images-management',
  templateUrl: './images-management.component.html',
  styleUrls: ['./images-management.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ImagesManagementComponent implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true; 
    this.isLoading = false;; 
  }

}
