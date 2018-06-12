import { UserModel } from '../users/model/user';
import { UsersService } from '../users/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: UserModel = new UserModel();
  constructor(private service: UsersService) { 
    this.service = service;
  }

  ngOnInit() {
    
  }
  
  register() {
    console.log(this.user);
    this.service.createUser(this.user).subscribe(o => {
      console.log(o);
    });
  }
  
  clear() {
    
  }
}
