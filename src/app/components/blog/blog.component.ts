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

  isLoading = false;
  state: string = '';
  posts:FirebaseListObservable<Post[]>;
  selectedKey:string = null;
  selectedTitle:string;

  constructor(private ps:PostService) {
    this.isLoading = true;
    this.posts = ps.getPosts();
    this.posts.subscribe(x => {
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

  delete(){
    if(this.selectedKey) this.posts.remove(this.selectedKey);
    this.selectedKey = null;
    this.selectedTitle = null;
  }

  select(key:string, title:string){
    this.selectedKey = key;
    this.selectedTitle = title;
  }

  cancel(){
    this.selectedKey = null;
    this.selectedTitle = null;
  }

}
