import { Component, Input } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  @Input()
  foodPage?:string[];

  @Input()
  justifyContent:string = "center";

  tags?:Tag[];

  constructor(private foodService:FoodService){}

  ngOnInit(){
    if (!this.foodPage){
      this.tags = this.foodService.getAllTags();
    }
  }
}
