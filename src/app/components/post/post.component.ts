import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post:FirebaseObjectObservable<Post>;

  constructor(private ps:PostService, private route:ActivatedRoute, private router:Router) {
    route.params.subscribe((params: Params) => {
      this.post = ps.getPost(params['key']);
    });
  }

  ngOnInit() {
    
  }

}
