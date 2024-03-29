import { Component } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/models/CartItem';
import { FoodService } from '../services/food/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!:Cart;

  constructor(private cartService:CartService,
    private router:Router
    // ,private foodService:FoodService
    ){
      if (!localStorage.getItem('token')){
        router.navigate(['Login']);
        return
      }
    // this.cartService.addToCart(this.foodService.getAll()[0]);
    // this.cartService.addToCart(this.foodService.getAll()[4]);
    this.setCart()
  }

  setCart():void{
    this.cart = this.cartService.getCart();
  }

  removeFromCart(cartItem:CartItem):void{
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id,quantity);
    this.setCart();
  }
}
