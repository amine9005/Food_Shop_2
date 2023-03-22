import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  constructor( private authService:AuthService ,
    private afAuth:AngularFireAuth,
    private router:Router,
     ){
  }

  resendEmail(){
    this.afAuth.authState.subscribe(user=>{
      if (user){
        this.authService.sendEmailForVerification(user);
      }
    })

  }
}
