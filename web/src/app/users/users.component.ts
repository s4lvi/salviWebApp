import { UserModel } from './model/user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: UserModel[] = new Array();
  
  constructor(private service: UsersService) { 
  }

  ngOnInit() {
    this.service.getUsers().subscribe(u => {
      for (var user in u) {
        this.users.push({
          username: u[user].username,
          email: u[user].email,
          createdAt: u[user].createdAt
        });
      }
      console.log(this.users);
    });
  }

}
