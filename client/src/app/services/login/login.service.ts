import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment.prod';
// import { serverPath_object } from '../../../environments/environment';

const serverPath = environment.serverPath;
@Injectable()
export class LoginService {
  // serverPath = environment.serverPath;
  authToken: any;
  constructor(private http: Http) { }

  enterUserData(credentials) {
    console.log(credentials)
    const headers = new Headers();
    // headers.append("Authorization", this.authToken);
    headers.append("Content-Type", " application/json");
    return this.http.post(serverPath + "/users/addUsers", credentials , { headers: headers } ).map((response: any) => response.json());
  }
}
