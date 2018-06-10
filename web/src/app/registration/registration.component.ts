import { UserModel } from './model/user';
import { RegistrationService } from './registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: RegistrationService) { 
    this.service = service;
  }

  ngOnInit() {
    
  }
  
  register() {
    const user: UserModel  = {
      username: "test",
      password: "test",
      email: "test",
    }
    this.service.postRegistrationInfo(user).subscribe(o => {
      console.log(o);
    });
  }
}
