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
        res => {

          if(res.user?.emailVerified == true){
            localStorage.setItem('token','true');

            this.router.navigate(['']).then(() => {
              window.location.reload();
            });

          } else{
            this.sendEmailForVerification(res.user);
            this.router.navigate(['Verify-email']);
          }

        } , err => {
          alert('Invalid email or password!');
          this.router.navigate(['Login']);
        }
      );
    }

    register(email:string,password:string):void{
      this.fireAuth.createUserWithEmailAndPassword(email,password).then(res =>{
        alert("Registration was successful");
        this.sendEmailForVerification(res.user);

        this.router.navigate(['Verify-email']);

      } , err =>{
        alert('Invaild Email!');
          this.router.navigate(['Register']);
      });
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

    forgotPassword(email:string){
      this.fireAuth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['Verify-email']);
      } , err =>{
        alert("Email was not found!");
      });
    }


    sendEmailForVerification(user: any){
      user.sendEmailVerification().then((res : any) => {
        this.router.navigate(['Verify-email']);
      } , (err :any) => {
        alert("can't send email");
      });
    }

}
