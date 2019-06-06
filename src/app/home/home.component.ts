import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged : boolean = false;

  constructor( private credentialsService: CredentialsService) { }

  ngOnInit() {
    this.isLogged = this.credentialsService.isAuthenticated();
  }

}
