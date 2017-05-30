import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp, FirebaseObjectObservable } from 'angularfire2';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  key:string;
  ngForm:FormGroup;
  

  constructor(@Inject(FirebaseApp) private firebaseApp: firebase.app.App, private af: AngularFire, private ps:PostService,private route: ActivatedRoute, private fb: FormBuilder) {

  }


  ngOnInit() {
    this.isLoading = true;  

    document.getElementById("blog_link").parentElement.classList.add('active');
    this.af.database.list('test').subscribe(list => {
      this.tests = list;
      this.af.auth.subscribe(auth => {
        if(auth) {
          this.name = auth;

          this.route.params.subscribe(params => {
            if(params['key']){
              this.key = params['key'];
              this.ps.getPost(this.key).subscribe(p => {
                this.ngForm = this.fb.group({
                  title: p.title,
                  intro: p.intro,
                  content: p.body
                });
                this.preview = p.body;
                this.isLoading = false;
              });
            }else{
              this.ngForm = this.fb.group({
                title: '',
                intro: '',
                content: ''
              });
              this.preview = '';
              this.isLoading = false;
            }
          });
        }
      });    
    })
  }

  onSubmit() {

      let post = new Post(
        this.name.auth.displayName,
        this.ngForm.value.content,
        new Date().getTime(),
        new Date().getTime(),
        this.ngForm.value.intro,
        0,
        "",
        [],
        this.ngForm.value.title
      );
      this.ps.push(post);
      this.toast();
    
    this.ngForm.reset();
    this.preview = '';
  }

  toast() {
      var x = document.getElementById("snackbar")
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }

  clear(){
    this.ngForm.reset();
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
