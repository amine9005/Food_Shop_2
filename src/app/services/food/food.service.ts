import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction,  } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private dbPathTags = '/Tags';
  private dbPathFoods = '/Foods';
  tagsRef :AngularFirestoreCollection<Tag>;
  foodsRef :AngularFirestoreCollection<Food>;

  private foods!:Food[];

  constructor(
    private readonly afs:AngularFirestore,
    ) {
      this.tagsRef = afs.collection(this.dbPathTags);
      this.foodsRef = afs.collection(this.dbPathFoods);
      this.getAll()
    }

  getAllFireTags(){
    return this.tagsRef.snapshotChanges();
  }


  getFoodById( id:number ):Food{
    return this.foods.find(food => food.id == id)!;
  }


  getAllFireFoods(){
    return this.foodsRef.snapshotChanges().pipe(map(changes => changes.map(
      c => ({ ...c.payload.doc.data()})
    )));
  }

  getAll():Food[]{

    this.getAllFireFoods().subscribe(data => {
      this.foods = data
    });

    return this.foods;
  }
}
