import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Limonnana';
  isLogged : boolean = false;

  constructor(private credentialsService: CredentialsService) { }

  ngOnInit() {
    this.isLogged = this.credentialsService.isAuthenticated();
    console.log('is authentik in header: ' + this.isLogged)
  }

}
