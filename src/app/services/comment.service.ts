import { Injectable } from '@angular/core';
import { Comment } from '../model/comment';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import "rxjs/add/operator/map";

@Injectable()
export class CommentService{
    comments:FirebaseListObservable<Comment[]>;

    constructor(private af: AngularFire){}

    getCommentsByBost(postKey:string):FirebaseListObservable<Comment[]>{
        return this.af.database.list('/comments', {
            query: {
               orderByChild: 'parent',
               equalTo: postKey
            }
        }).map((arr) => arr.sort(function(a, b){return a.created - b.created}).reverse()) as FirebaseListObservable<Comment[]>;
    }

    push(comment:Comment){
        this.af.database.list('/comments').push(comment);
    }
}