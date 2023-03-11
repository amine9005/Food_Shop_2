import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = '';
  password:string = '';
  background_color:string = '#ffb8b8';
  constructor(private authService:AuthService,private router:Router){

    if(localStorage.getItem('toekn')){
      router.navigate(['']);
    }
  }

  login(){
    if (this.email == ''){
      return;
    } else{

    }
    if (this.password == ''){
      return;
    }
    this.authService.login(this.email,this.password);
    this.email = '';
    this.password = '';

  }
}
