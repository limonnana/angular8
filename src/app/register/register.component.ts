import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  error: string;

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
    const userFromForm = this.registerForm.value;
    this.error = this.validationService.validateRegisterForm(userFromForm);
    if(this.error !== null){
      console.log('error from form: ' + this.error);
      return ; 
    }else{
    this.userService.save(userFromForm)
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

}
