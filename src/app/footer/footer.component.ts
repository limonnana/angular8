import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLogged : boolean = false;

  constructor(private credentialsService: CredentialsService, private router: Router) { }

  ngOnInit() {
    this.isLogged = this.credentialsService.isAuthenticated();
    console.log('is authentik? ' + this.isLogged)
  }

  logout() {
    this.credentialsService.logout().subscribe(() => this.router.navigate(['home']));
  }

}
