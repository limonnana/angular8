import { Component, OnInit } from '@angular/core';
import { Login } from '../entities/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { User } from '../entities/user';
import {Router} from "@angular/router";
import {CredentialsService } from '../services/credentials.service';
import { Credentials } from '../entities/credentials';
import { ValidationService } from '../services/validation.service';
import { Role } from '../entities/role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  model = new Login('','',false);
  wrongCredentials: string | undefined;
  loginForm!: FormGroup;
  user: User;
  credentials = new Credentials('', '',  Role.USER);

  constructor( private formBuilder: FormBuilder,
     private loginService: LoginService,
     private router: Router,
     private credentialsService: CredentialsService
  )
  {
    this.createForm();
  }
  submitted = false;

  login() {
    
    this.loginService.authenticate(this.loginForm.value).subscribe(data => {
      this.user = data;
      console.log('User Logged: ' + JSON.stringify(this.user));
      if(this.user.token){
       //     this.credentials.username = this.user.email;
            this.credentials.token = this.user.token;
            this.credentials.role = this.user.role;
            this.credentialsService.setCredentials(this.credentials,this.loginForm.value.rememberMe);
            this.router.navigate(['home']);
      }else{
        this.wrongCredentials = "wrong credentials";
     }
    });
  }

  
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', ],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

}
