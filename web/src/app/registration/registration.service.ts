import { UserModel } from '../users/model/user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
  

export class RegistrationService {
 
  private url: string = 'http://localhost:3000';
  //private url: string = "http://ec2-18-218-174-120.us-east-2.compute.amazonaws.com:3000";
  
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {
  }
   
  postRegistrationInfo(user: UserModel): Observable<Object> {
    var userReq = JSON.stringify(user);
    console.log(userReq);
    return this.http.post(this.url + '/api/users/create', userReq, this.options)
      .map((res: Response) => res.json());
  }
}