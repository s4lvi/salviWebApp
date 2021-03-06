import { UserModel } from './model/user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
  

export class UsersService {
  
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
 
  
  constructor(private http: Http) {
  }
    
  getUsers(): Observable<Object> {
    return this.http.get(environment.serverUrl + '/api/users/')
      .map((res: Response) => res.json());
  }
    
  login(user: UserModel): Observable<Object> {
    var userReq = JSON.stringify(user);
    return this.http.post(environment.serverUrl + '/api/login/', userReq, this.options)
      .map((res: Response) => res.json());
  }
  
  isLoggedIn(username: string, token: string): boolean {
    var tokenReq = JSON.stringify({username: username, token: token});
    this.http.post(environment.serverUrl + '/api/login/check', tokenReq, this.options).map((res: Response) => {
      if (res.status == 200) {return true;}
      else {return false;}
    });
    return false;
  }
  
  deleteUser(userId: string): Observable<Object> {
    return this.http.delete(environment.serverUrl + '/api/users/' + userId )
      .map((res: Response) => res.json());
  }
  
  createUser(user: UserModel): Observable<Object> {
    var userReq = JSON.stringify(user);
    return this.http.post(environment.serverUrl + '/api/users/create', userReq, this.options)
      .map((res: Response) => res.json());
  }
  
  updateUser(user: UserModel): Observable<Object> {
    var userReq = JSON.stringify(user);
    return this.http.post(environment.serverUrl +'/api/users/' + user.id + '/update', userReq, this.options)
      .map((res: Response) => res.json());
    
  }
}