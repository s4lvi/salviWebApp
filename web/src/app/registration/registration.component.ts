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
    this.service.postRegistrationInfo().subscribe(o => {
      console.log('subscribed');
      console.log(o);
    });
  }
}
