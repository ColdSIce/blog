import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class PostService{
    posts:FirebaseListObservable<Post[]>;

    constructor(private af: AngularFire){}

    getPosts(){
        return this.af.database.list('/posts');
    }

    getPost(key:string){
        return this.af.database.object('/posts/' + key);
    }
}