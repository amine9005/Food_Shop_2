import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private authService:AuthService){

  }

  email:string = '';
  isVaildEmail:boolean = true;

  forgotPassword(){
    const validEmail = new FormControl(this.email,[Validators.email,Validators.min(6),Validators.min(32)])

    if(validEmail.errors || this.email == ''){
      this.isVaildEmail = false;
    }else {
      this.isVaildEmail = true;
    }

    if (this.isVaildEmail){
      this.authService.forgotPassword(this.email);

    }
  }


}
