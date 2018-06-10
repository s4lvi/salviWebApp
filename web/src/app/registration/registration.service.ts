import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})

export class RegistrationService {
  constructor(private http: Http) { }
  
  postRegistrationInfo(): Observable<Object> {
    return this.http.post('http://localhost:3000/api/user/create', JSON.stringify({test: 'test'}))
      .map((res: Response) => res.json());
  }
}