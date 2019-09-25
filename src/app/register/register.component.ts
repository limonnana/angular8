import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { Role } from '../entities/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  error: string;
  email: string = '';

  constructor( private userService: UserService,
     private formBuilder: FormBuilder,
      private router: Router,
      private validationService: ValidationService
      ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  register(){
    const userFromForm: User = this.registerForm.value;
    this.error = this.validationService.validateRegisterForm(userFromForm);
    if(this.error != null){
      console.log('error from form: ' + this.error);
      return ; 
    }else{
      userFromForm.role = Role.USER;
    this.userService.register(userFromForm)
    .subscribe( data => {
      this.router.navigate(['login']);
    });
  }
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      retypePassword: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
  });
  }

  public isEmailTaken(){
    this.error = '';
    let result =  'false';
    const userFromForm: User = this.registerForm.value;
    let email: string = userFromForm.email;
     this.userService.isEmailTaken(email)
      .subscribe( data => {
        if(data.result==='true'){
          this.email  = 'true';
          this.error = 'Email already registered, please login or use forgot password ';
        }else{
          this.email = 'false';
        }
      });
  }

}
