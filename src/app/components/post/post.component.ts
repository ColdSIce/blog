import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class PostComponent implements OnInit {

  state: string = '';
  post:FirebaseObjectObservable<Post>;

  constructor(private ps:PostService, private route:ActivatedRoute, private router:Router) {
    route.params.subscribe((params: Params) => {
      this.post = ps.getPost(params['key']);
    });
    document.getElementById("blog_link").parentElement.classList.add('active');
  }

  ngOnInit() {
    
  }

}
