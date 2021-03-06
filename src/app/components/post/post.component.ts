import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../model/post';
import { Comment } from '../../model/comment';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class PostComponent implements OnInit {

  isLoading = false;
  name:any;
  postBody:any;
  postKey:string;
  state: string = '';
  post:FirebaseObjectObservable<Post>;
  comments:FirebaseListObservable<Comment[]>;
  selectedKey:string = null;
  selectedTitle:string;

  constructor(private af:AngularFire,
    private ps:PostService, 
    private route:ActivatedRoute, 
    private router:Router,
    private cs:CommentService) {

    this.isLoading = true;
    route.params.subscribe((params: Params) => {
      this.postKey = params['key'];
      this.post = ps.getPost(params['key']);
      this.post.subscribe(p => {
        this.postBody = p.body;
      })
    });
    route.params.subscribe((params: Params) => {
      this.comments = cs.getCommentsByBost(params['key']);
    });

    this.comments.subscribe(x => {
      this.isLoading = false;
    });

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

    document.getElementById("blog_link").parentElement.classList.add('active');
  }

  ngOnInit() {
    
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.cs.push(new Comment(this.name.auth.displayName, (new Date()).getTime(), this.postKey, formData.value.comment));
    }
    formData.reset();
  }

  edit(){
    this.post.subscribe(p => {
      this.router.navigate(['/app/post-management', {'key':this.postKey}]);
    }); 
  }

  delete(){
    this.ps.getPosts().remove(this.postKey);
    this.router.navigate(['/app/blog']);
  }
}
