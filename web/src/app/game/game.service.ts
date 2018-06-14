
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { MessageModel } from './model/message';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})

export class GameService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {
  }
  
  getMessages(): Observable<Object> {
    return this.http.get(environment.serverUrl + '/api/messages/')
      .map((res: Response) => res.json());
  }
  
  addMessage(message: MessageModel): Observable<Object> {
    var messageReq = JSON.stringify(message);
    return this.http.post(environment.serverUrl + '/api/messages/', messageReq, this.options)
      .map((res: Response) => res.json());
  }

}