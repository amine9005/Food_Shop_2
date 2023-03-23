import { Component,Input } from '@angular/core';
import { Food } from '../shared/models/Food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})


export class FoodPageComponent {
  @Input()
  cartButtonMsg:string = 'Login To Add To Cart';

  food!:Food;

  constructor(
    private activatedRoute:ActivatedRoute ,
    private foodService:FoodService,
    private cartService:CartService,
    private router:Router,
    ){
      if (localStorage.getItem('token')){
        this.cartButtonMsg = "Add To Cart";
      } else {
        this.cartButtonMsg = 'Login To Add To Cart';
      }
    activatedRoute.params.subscribe(
      (params)=>{
        if(params['id']){
          foodService.getAllFireFoods().subscribe(data => {
            this.food =  data.find(food => food.id == params['id'])!;
          })
        }
      }
    )
  }

  addToCart(food:Food){
    if (localStorage.getItem('token')){
      this.cartService.addToCart(food);
      this.router.navigateByUrl('/Cart');

    } else{
      this.router.navigate(['Login'])
    }

  }
}
