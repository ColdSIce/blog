import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  current:any;
  url:string;

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {  
    this.url = this.document.location.href;

    if(this.url.includes("about")){
      this.current = document.getElementById("about_link").parentElement;
    } else if(this.url.includes("blog")){
      this.current = document.getElementById("blog_link").parentElement;
    } else if(this.url.includes("projects")){
      this.current = document.getElementById("projects_link").parentElement;
    }

    this.current.classList.add("active");
  }

  setSwitchActive(e){
    this.current.classList.remove("active");
    e.target.parentElement.classList.add("active");
    this.current = e.target.parentElement;
  }

}
