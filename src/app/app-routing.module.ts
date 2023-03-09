import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Search/:searchTerm',component:HomeComponent},
  {path:'Tag/:tags',component:HomeComponent},
  {path:'Food/:id',component:FoodPageComponent},
  {path:'Cart',component:CartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
