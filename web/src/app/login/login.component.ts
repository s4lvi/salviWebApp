import { UserModel } from '../users/model/user';
import { UsersService } from '../users/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  form: FormGroup;
  loginError: boolean = false;
  
  constructor(private service: UsersService, private fb: FormBuilder, private router: Router) { 
    this.service = service;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.user.username = this.form.controls['username'].value;
      this.user.password = this.form.controls['password'].value;
      this.service.login(this.user).subscribe(response => {
        this.loginError=false;
        console.log(response);
        this.router.navigate(['../game']);
      }, err => {
        console.log(err);
        this.loginError = true;
      });
    } else {
      console.log(this.form.errors);
    }
  }
  
}
