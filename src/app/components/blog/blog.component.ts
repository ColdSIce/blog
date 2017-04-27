import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts:FirebaseListObservable<Post[]>;

  constructor(private ps:PostService) {
    this.posts = ps.getPosts();
  }

  ngOnInit() {
  }

}
