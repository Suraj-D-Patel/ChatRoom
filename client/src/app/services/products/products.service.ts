import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment.prod';
const serverPath = environment.serverPath;
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductsService {
  authToken: any;
  constructor(private http: Http) { }

  ADDPRoducts(credentials) {
    console.log(credentials)
    const headers = new Headers();
    // headers.append("Authorization", this.authToken);
    headers.append("Content-Type", " application/json");
    return this.http.post(serverPath + "/products/addProducts", credentials , { headers: headers } ).map(response => response.json()).catch(error => Observable.throw(error));
  }

  getALLPRODUCTS(){
    const headers = new Headers();
    headers.append("Content-Type", " application/json");
    return this.http.get(serverPath + '/products/get_all_products' , {headers: headers})
    .map(res => res.json()).catch(error => Observable.throw(error));
  }

  getProductbyProductID(productID){
    console.log("product id in service = " , productID)
    const headers = new Headers();
    headers.append("Content-Type", " application/json");
    return this.http.get(serverPath + '/products/get_product/'+productID , {headers: headers})
    .map(res => res.json()).catch(error => Observable.throw(error));
  }
}
