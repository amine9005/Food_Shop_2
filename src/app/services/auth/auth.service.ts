import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogedIn:boolean = false;
  constructor(
    private fireAuth:AngularFireAuth ,
    private router:Router,
    ) { }

    login(email:string,password:string):void{
      this.fireAuth.signInWithEmailAndPassword(email,password).then(
        () => {
          localStorage.setItem('token','true');
          window.location.reload();
          this.router.navigate(['']);

        } , err => {
          alert('Invalid email or password!');
          this.router.navigate(['Login']);
        }
      );
    }

    register(email:string,password:string):void{
      this.fireAuth.createUserWithEmailAndPassword(email,password).then(() =>{
        alert("Registration was successful");
        this.router.navigate(['Login']);
      } , err =>{
        alert('Invaild Email!');
          this.router.navigate(['Register']);
      }

      );
    }

    logout():void{
      this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('token');
        this.router.navigate(['']);

      } , err=>{
        alert("Failed to logout");
      }
      );

    }


}
