import { Component, OnInit } from '@angular/core';
import { Login } from '../entities/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  title = 'Limonnana';
  public model = new Login('','',false);
  

}
