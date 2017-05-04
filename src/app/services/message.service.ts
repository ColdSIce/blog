import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class MessageService{

    constructor(private af: AngularFire){}

    push(message:Message){
        return this.af.database.list('/messages').push(message);
    }
}