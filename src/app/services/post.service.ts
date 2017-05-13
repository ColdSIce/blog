import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import "rxjs/add/operator/map";

@Injectable()
export class PostService{
    posts:FirebaseListObservable<Post[]>;

    constructor(private af: AngularFire){}

    getPosts(){
        return this.af.database.list('/posts')
        .map((arr) => arr.sort(function(a, b){return a.created - b.created}).reverse()) as FirebaseListObservable<Post[]>;
    }

    getPost(key:string){
        return this.af.database.object('/posts/' + key);
    }
    
    push(post:Post){
        this.af.database.list('/posts').push(post);
    }
}    