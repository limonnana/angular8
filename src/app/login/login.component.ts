import { Component, OnInit } from '@angular/core';
import { Login } from '../entities/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  title = 'Limonnana';
  model = new Login('','',false);
  wrongCredentials: string | undefined;
  loginForm!: FormGroup;

  constructor( private formBuilder: FormBuilder){
    this.createForm();
  }
  submitted = false;

  login() {

    console.log(JSON.stringify(this.loginForm.value));
  }

  /*onSubmit() { 
    console.log('Form: ' + JSON.stringify(this.model));
    this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  */
  
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

}
