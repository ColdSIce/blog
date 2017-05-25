import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
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
  uploadedUrl = "";

  constructor(@Inject(FirebaseApp) private firebaseApp: firebase.app.App, private af: AngularFire, private ps:PostService) { }

  ngOnInit() {
    this.isLoading = true;  
    document.getElementById("blog_link").parentElement.classList.add('active');
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

  upload(){
    let storageRef = this.firebaseApp.storage().ref();
    let input:HTMLInputElement = <HTMLInputElement>document.getElementById("upload");
    if(input.files[0]){
      this.isLoading = true; 
      let path = '/images/' + input.files[0].name;
      let iRef = storageRef.child(path);
      iRef.put(input.files[0]).then((snapshot) => {
        this.uploadedUrl = snapshot.downloadURL;
        this.af.database.list(`/images`).push({ path: path, filename: input.files[0].name });
        input.value = "";
        this.isLoading = false; 
      });
    }
  }

}
