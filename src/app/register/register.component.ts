import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email:string = '';
  password:string = '';
  constructor(private authService:AuthService,){

  }

  register(){
    if (this.email == ''){
      alert("email is empty");
      return;
    }
    if (this.password == ''){
      alert("password is empty");

      return;
    }
    this.authService.register(this.email,this.password);
    this.email = '';
    this.password = '';

  }
}
