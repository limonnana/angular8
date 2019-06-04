import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLogged : boolean = false;

  constructor(private credentialsService: CredentialsService) { }

  ngOnInit() {
    this.isLogged = this.credentialsService.isAuthenticated();
    console.log('is authentik? ' + this.isLogged)
  }

  logout() {
    this.credentialsService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

}
