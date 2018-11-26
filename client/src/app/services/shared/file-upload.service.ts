import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment.prod';
const serverPath = environment.serverPath;
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FileUploadService {
  authToken: any;

  constructor(private http: Http) { }

  uploadIMAGE(credentials) {
    console.log(credentials)
    // const headers = new Headers();
    // headers.append("Authorization", this.authToken);
    // headers.append("Content-Type", " application/json");
    return this.http.post(serverPath + "/upload_photos", credentials).map(response => response.json()).catch(error => Observable.throw(error));
  }

  getImages(image){
    const headers = new Headers();
    headers.append("Content-Type", " application/json");
    return this.http.get(serverPath + '/getimages?image='+ image , {headers: headers})
    .map(res => res.json()).catch(error => Observable.throw(error));
    // return this.http.get(serverPath + "/getimages").map(response => response.json()).catch(error => Observable.throw(error));
  }
}
