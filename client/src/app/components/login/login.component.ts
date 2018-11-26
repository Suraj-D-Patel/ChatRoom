import { LoginService } from './../../services/login/login.service';
import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.minLength(3), Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'confpassword': [null,Validators.compose([Validators.required])]
      })
   }

  ngOnInit() {

  }

  login() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    const confpassword = this.loginForm.controls.confpassword.value;
    if (password == confpassword) {
      this.loginService.enterUserData({ username: username, password: password }).subscribe(data => {
        console.log("hello = ", data);
        if(data.status == 200) {
          swal({ title: 'Success!', text: 'Data Saved Successfully!', type: 'success', confirmButtonText: 'ok', allowOutsideClick: false })
        // .then(function () {});
        } else if( data.status == 400) {
          swal({ title: 'Error!', text: 'Duplicate Entry!', type: 'warning', confirmButtonText: 'ok', allowOutsideClick: false })
        }
      });
    } else {
      //error
    }
  }
}
