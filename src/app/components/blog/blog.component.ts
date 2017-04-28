import { Component, OnInit, HostBinding } from '@angular/core';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class BlogComponent implements OnInit {

  state: string = '';
  posts:FirebaseListObservable<Post[]>;

  constructor(private ps:PostService) {
    this.posts = ps.getPosts();
  }

  ngOnInit() {
  }

}
