import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Router} from "@angular/router";
import {User} from "../../entities/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  user: User = new User();

  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }
  
  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.user.name = data.name;
        this.user.phone = data.phone;
        this.user.email = data.email;
        this.user.id = +userId;
        this.editForm.setValue(this.user);
      });
  }
}
