import { Injectable, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { Food } from 'src/app/shared/models/Food';
import { CartItem } from '../../shared/models/CartItem';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subject, map, take } from 'rxjs';
import { FireItem } from 'src/app/shared/models/FireItem';
import { FoodService } from '../food/food.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private dbPath:string = '/Cart';


  private cart:Cart  = new Cart();
  cartRef: AngularFirestoreCollection<FireItem>;
  userId:string = '';
  items!:FireItem[];


  constructor(private afAuth:AngularFireAuth,
    private router:Router,
    private foodService:FoodService,
    private afs:AngularFirestore,
    ){
      this.cartRef = afs.collection(this.dbPath);
       if (localStorage.getItem('token')){
      this.afAuth.authState.subscribe( user => {
        this.userId = user!.uid;

        this.fillCart();
      });
    }
  }


  addToCart(food: Food):void{


    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if(cartItem){

      this.changeQuantity(food.id, cartItem.quantity);

      this.cartRef.doc(this.userId).collection("CartItems").doc(food.id.toString()).set(Object.assign({},new FireItem(food.id,cartItem.quantity)))

      return;
    }
    this.cartRef.doc(this.userId).collection("CartItems").doc(food.id.toString()).set(Object.assign({},new FireItem(food.id,1)))
    this.cart.items.push( new CartItem(food));
  }


  removeFromCart(foodId:number): void{
    this.cart.items =
    this.cart.items.filter(item => item.food.id != foodId);
    this.cartRef.doc(this.userId).collection("CartItems").doc(foodId.toString()).delete();
    if (this.cart.items.length == 0){
      localStorage.removeItem('cart');
    }

  }

  changeQuantity(foodId:number, quantity:number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
    this.cartRef.doc(this.userId).collection("CartItems").doc(foodId.toString()).update(
      {count:cartItem.quantity})
  }


  retriveCart(){
    // this.cart = new Cart();
    return this.cartRef.doc(this.userId).collection("CartItems").snapshotChanges().pipe(take(1)).pipe(
      map(changes => changes.map(
        c => ({ ...c['payload'].doc.data() as FireItem})
      ))
    );
  }

  fillCart(){
    this.retriveCart().subscribe(res=>{
      this.items = res;
      this.items.forEach(fireItem => {
        const food = this.foodService.getFoodById(fireItem.id)
        // alert(fireItem.count)
        this.addToCart(food);
      })
    })



  }

  getCart():Cart{
    return this.cart;
  }
}
