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

  name:any;
  postKey:string;
  state: string = '';
  post:FirebaseObjectObservable<Post>;
  comments:FirebaseListObservable<Comment[]>;

  constructor(private af:AngularFire,
    private ps:PostService, 
    private route:ActivatedRoute, 
    private router:Router,
    private cs:CommentService) {

    route.params.subscribe((params: Params) => {
      this.postKey = params['key'];
      this.post = ps.getPost(params['key']);
    });
    route.params.subscribe((params: Params) => {
      this.comments = cs.getCommentsByBost(params['key']);
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
}
