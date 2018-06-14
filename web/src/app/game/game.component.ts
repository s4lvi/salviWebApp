import { GameService } from './game.service';
import { MessageModel } from './model/message';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('scrollBar') private myScrollContainer: ElementRef;
  
  message: MessageModel = new MessageModel();
  form: FormGroup;
  messages: MessageModel[];
  gameInput: string;
  constructor(private service: GameService, private fb: FormBuilder) { 
    this.service = service;
    this.form = this.fb.group({
      gameInput: ['', Validators.required]
    });
  }

  ngOnInit() {
        this.refreshMessages();
        this.scrollToBottom();
  }
    
  ngAfterViewChecked() {
        this.scrollToBottom();
  } 
  
  refreshMessages() {
    console.log('getting messages');
    this.messages = [];
    this.service.getMessages().subscribe(m => {
      for (var message in m) {
        this.messages.push({
          message: m[message].message,
          messageType: m[message].messageType,
          createdAt:  m[message].createdAt,
          id:  m[message].id
        });
      }
    });
  }
  
  submit() {
    if (this.form.valid) {
      console.log('submitting');
      this.message.message = this.gameInput;
      this.service.addMessage(this.message).subscribe(response => {
        console.log(response);
        this.refreshMessages();
        this.gameInput = null;
      });
    } else {
      console.log(this.form.errors);
    }
  }
  
  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.submit();
    }
  }
  
    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }
}
