import { UserModel } from '../users/model/user';
import { UsersService } from '../users/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: UserModel = new UserModel();
  form: FormGroup;
  registered: string = 'unregistered';

  constructor(private service: UsersService, private fb: FormBuilder) { 
    this.service = service;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }
  
  register() {
    if (this.form.valid) {
      this.user.username = this.form.controls['username'].value;
      this.user.password = this.form.controls['password'].value;
      this.user.email = this.form.controls['email'].value;
      this.service.createUser(this.user).subscribe(response => {
        this.registered='registered';
      }, err => {
        console.log(err);
        this.registered='registration-error';
      });
    } else {
      console.log(this.form.errors);
    }
  }
  
  clear() {
    
  }
}
