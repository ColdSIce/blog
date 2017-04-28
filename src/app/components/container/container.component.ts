import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ContainerComponent implements OnInit {

  current:any;
  url:string;
  name: any;
  state: string = '';

  constructor(@Inject(DOCUMENT) private document: any,public af: AngularFire,private router: Router) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/app/about');
  }

  ngOnInit() {  
    this.url = this.document.location.href;

    if(this.url.includes("about")){
      this.current = document.getElementById("about_link").parentElement;
    } else if(this.url.includes("blog")){
      this.current = document.getElementById("blog_link").parentElement;
    } else if(this.url.includes("projects")){
      this.current = document.getElementById("projects_link").parentElement;
    }

    if(this.current)this.current.classList.add("active");
  }

  setSwitchActive(e){
    window.scrollTo(0, 0);
    this.current.classList.remove("active");
    e.target.parentElement.classList.add("active");
    this.current = e.target.parentElement;
  }

}
