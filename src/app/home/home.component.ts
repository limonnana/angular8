import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged : boolean = false;
  userCredentials : string;
  username : string;
  token: string;

  constructor( private credentialsService: CredentialsService) { }

  ngOnInit() {
    this.isLogged = this.credentialsService.isAuthenticated();
    if(this.credentialsService.credentials){
    this.userCredentials = JSON.stringify(this.credentialsService.credentials);
    this.username = this.credentialsService.credentials.username;
    this.token = this.credentialsService.credentials.token;
    }
  }

}
