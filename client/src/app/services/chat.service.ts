import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  appPath = environment.serverPath;
  // constructor() { }
  private socket = io(this.appPath);

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    let observable = new Observable<{user:String, message:String}>(observer => {
      this.socket.on('New User Joined',(data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave',data);
  }

  UserLeftTHEroom() {
    let observable = new Observable<{user:String,message:String}>(observer => {
      this.socket.on('user left', (data)=> {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  Message(data) {
    this.socket.emit('message',data);
  }

  NewMessage() {
    let observable = new Observable<{user:String,message:String}>(observer => {
      this.socket.on('new message' , (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
}
