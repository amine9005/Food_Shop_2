import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Search/:searchTerm',component:HomeComponent},
  {path:'Tag/:tags',component:HomeComponent},
  {path:'Food/:id',component:FoodPageComponent},
  {path:'Cart',component:CartPageComponent},
  {path:'Login',component:LoginComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Rest-password',component:ForgotPasswordComponent},
  {path:'Verify-email',component:VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
