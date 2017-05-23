import { Component, OnInit, HostBinding } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class PostManagementComponent implements OnInit {

  name:any;
  tests:any[];
  isLoading = false;
  preview = '';

  constructor(private af: AngularFire, private ps:PostService) { }

  ngOnInit() {
    this.isLoading = true;  
    this.af.database.list('test').subscribe(list => {
      this.tests = list;
      this.af.auth.subscribe(auth => {
        if(auth) {
          this.name = auth;
          this.isLoading = false;
        }
      });    
    })
  }

  onSubmit(formData) {
    if(formData.valid) {
      let post = new Post(
        this.name.auth.displayName,
        formData.value.content,
        new Date().getTime(),
        new Date().getTime(),
        formData.value.intro,
        0,
        "",
        [],
        formData.value.title
      );
      this.ps.push(post);
      this.toast();
    }
    formData.reset();
    this.preview = '';
  }

  toast() {
      var x = document.getElementById("snackbar")
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }

  clear(formData){
    formData.reset();
    this.preview = '';
  }

  updatePreview(formData){
    this.preview = formData.value.content;
  }

}
