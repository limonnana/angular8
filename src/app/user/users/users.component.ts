import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: User[];

  constructor(private userService: UserService, private router: Router ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['editUser']);
  };

}
