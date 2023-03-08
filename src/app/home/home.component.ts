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
        this.foods = this.FoodService.getAll().filter( food =>
          food.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      } else if(params['tags']){
        this.foods = this.FoodService.getAll().filter( food =>
            food.name.toLowerCase().includes(params['tags'].toLowerCase()));
      } else{
        this.foods = this.FoodService.getAll();
      }


    })
  }

}
