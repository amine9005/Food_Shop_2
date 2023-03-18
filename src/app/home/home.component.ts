import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  foods:Food[] = [];
  searchTerm$ = this.route.paramMap

  constructor(private FoodService:FoodService , private route:ActivatedRoute){

  }

  ngOnInit(){
    this.route.params.subscribe( params => {
      if(params['searchTerm']) {
        this.getAllFoodsBySearch(params['searchTerm']);
      } else if(params['tags']){
        this.getAllFoodsByTag(params['tags']);
      } else{
        this.getFoods();
      }
    })
  }

  getAllFoodsBySearch(searchTerm:string){
    this.FoodService.getAllFireFoods().subscribe(data => {
      this.foods = data.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

}

  getAllFoodsByTag(tag:string){
    tag.toLowerCase()=="all"? this.getFoods() : this.getFoodByTag(tag);
  }

  getFoodByTag(tag:string){
    this.FoodService.getAllFireFoods().subscribe(data => {
      this.foods = data.filter(foods => foods.tags?.includes(tag) );
      })
  }

  getFoods(){
   this.FoodService.getAllFireFoods().subscribe(data => {
    this.foods = data;
    })
  }

}
