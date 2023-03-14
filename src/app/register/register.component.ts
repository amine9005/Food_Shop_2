import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email:string = '';
  password:string = '';
  cpassword:string = '';

  isVaildEmail:boolean = true;
  isVaildPassword:boolean = true;
  isVaildCPassword:boolean = true;
  constructor(private authService:AuthService,){

  }

  register(){
    const vaildEmail = new FormControl(this.email, [Validators.email,Validators.required,Validators.max(64)]);
    const validPassword = new FormControl(this.password, [Validators.required,Validators.min(8),Validators.max(64)])
    const vaildCPasswrod = new FormControl(this.cpassword , [Validators.required,Validators.min(8),Validators.max(64)])

    if (vaildEmail.errors != null){
      this.isVaildEmail = false;
    }else{
      this.isVaildEmail = true;
    }
    if (validPassword.errors != null){
      this.isVaildPassword = false;
    }else{
      this.isVaildPassword = true;
    }

    if (vaildCPasswrod.errors != null){
      this.isVaildCPassword = false;
    } else{
      this.isVaildCPassword = true;
    }
    if (this.password != this.cpassword || this.password == ''){
      this.isVaildCPassword = false;
    } else {
      this.isVaildCPassword = true;
    }

    if (this.isVaildCPassword && this.isVaildEmail && this.isVaildPassword){
      this.authService.register(this.email,this.password);
      this.email = '';
      this.password = '';
      this.cpassword = '';
    }


  }
}
