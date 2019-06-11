import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CredentialsService } from './services/credentials.service';
import { Subscription } from 'rxjs';
import { Role } from './entities/role';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Limonnana';
  headerFooter: boolean = true;
  isLogged : boolean = false;
  showSecondNav: boolean;
  subscription: Subscription;
  role: Role;

  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) { 
    this.checkSecondNav();
  }

  ngOnInit() {
   
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.headerFooter = (event.url !== '/login');
          this.isLogged = this.credentialsService.isAuthenticated();
          this.role = this.credentialsService.getRole();
          this.checkSecondNav();
        }
      });
      
  }   

    checkSecondNav(){
      if(this.headerFooter && this.isLogged && this.role===Role.ADMIN){
        this.showSecondNav = true;
      }
     
    }

}
