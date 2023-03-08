import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Search/:searchTerm',component:HomeComponent},
  {path:'Tag/:tags',component:HomeComponent},
  {path:'Food/:id',component:FoodPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
