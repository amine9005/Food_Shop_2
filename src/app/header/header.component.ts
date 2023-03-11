import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLogedIn:boolean = false;
  constructor(private authService:AuthService){
    this.isLogedIn = localStorage.getItem('token') ? true:false;
  }

  logout(){
    this.authService.logout();

  }

}
