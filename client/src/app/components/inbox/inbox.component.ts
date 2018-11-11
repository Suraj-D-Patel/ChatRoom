import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.css"],
  providers: [ChatService]
})
export class InboxComponent {
  user_created: boolean = false;
  chat_fg: FormGroup;
  messageArray: Array<{ user: String; message: String }> = [];

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService
  ) {
    this.chat_fg = this.formBuilder.group({
      'user_name': [null, Validators.minLength(3)],
      'room_name': [null],
      'messageText': [null]
    });
    this.chatService.newUserJoined().subscribe(data => {
      // console.log("new user joined data ", data);
      this.messageArray.push(data);
    });
    this.chatService.UserLeftTHEroom().subscribe(data => {
      this.messageArray.push(data);
    });
  }

  Join() {
    this.chat_fg.controls.user_name.setValidators([Validators.required]);
    this.chat_fg.controls.user_name.updateValueAndValidity();
    this.chat_fg.controls.room_name.setValidators([Validators.required]);
    this.chat_fg.controls.room_name.updateValueAndValidity();

    if(this.chat_fg.controls.user_name.valid && this.chat_fg.controls.room_name.valid){
      this.chatService.joinRoom({
        user: this.chat_fg.controls.user_name.value,
        room: this.chat_fg.controls.room_name.value
      });
      this.user_created = true;
    }
  }

  Leave() {
    this.chatService.leaveRoom({
      user: this.chat_fg.controls.user_name.value,
      room: this.chat_fg.controls.room_name.value
    });
    this.user_created = false;
    this.chat_fg.controls.user_name.setValue(null);
    this.chat_fg.controls.user_name.clearValidators();
    this.chat_fg.controls.user_name.updateValueAndValidity();
    this.chat_fg.controls.room_name.setValue(null);
    this.chat_fg.controls.room_name.clearValidators();
    this.chat_fg.controls.room_name.updateValueAndValidity();
    this.chat_fg.controls.messageText.setValue(null);
    this.chat_fg.controls.messageText.clearValidators();
    this.chat_fg.controls.messageText.updateValueAndValidity();
  }

  sendMessage() {
    this.chat_fg.controls.messageText.setValidators([Validators.required]);
    this.chat_fg.controls.messageText.updateValueAndValidity();

    if(this.chat_fg.controls.messageText.valid) {
      this.chatService.Message({
        user: this.chat_fg.controls.user_name.value,
        room: this.chat_fg.controls.room_name.value,
        message: this.chat_fg.controls.messageText.value
      });

      this.chat_fg.controls.messageText.setValue(null);
      this.chat_fg.controls.messageText.clearValidators();
      this.chat_fg.controls.messageText.updateValueAndValidity();
    }
  }
}
