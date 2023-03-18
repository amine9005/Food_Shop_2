import { Component, Input } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { FoodService } from '../services/food/food.service';
import { Observable, map } from 'rxjs';



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
      this.retrieveTags();
    }
  }

  sortByName(N1:Tag,N2:Tag){
    if (N1.name < N2.name) {
      return -1;
    }
    if (N1.name > N2.name) {
      return 1;
    }
    return 0;
  }


  retrieveTags() {

    this.foodService.getAllFireTags().pipe(
      map(chagnes => chagnes.map(
        c => ({...c.payload.doc.data()})
        ))).subscribe(data =>
          {this.tags = data.sort(this.sortByName)});
  }

}
