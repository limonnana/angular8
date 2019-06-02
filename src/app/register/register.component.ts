import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
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

  constructor( private userService: UserService, private formBuilder: FormBuilder, private router: Router ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  register(){
    const userFromForm = this.registerForm.value;
    this.userService.save(userFromForm)
    .subscribe( data => {
      this.router.navigate(['users']);
    });
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
