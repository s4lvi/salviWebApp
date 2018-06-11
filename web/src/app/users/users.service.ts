import { UserModel } from './model/user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
  

export class UsersService {
 
  private url: string = 'http://localhost:3000';
  //private url: string = "http://ec2-18-218-174-120.us-east-2.compute.amazonaws.com:3000";
  
  constructor(private http: Http) {
  }
    
  getUsers(): Observable<Object> {
    return this.http.get(this.url + '/api/users/')
      .map((res: Response) => res.json());
  }
}