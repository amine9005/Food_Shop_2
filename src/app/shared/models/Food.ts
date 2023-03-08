export class Food {
  //  mandatoriy value !: must be defined on creation
  id!:number;
  name!:string;
  price!:number;
  // optinal value can be undifined ?:
  tags?:string[];
  favorite:boolean = false;
  stars:number = 0;
  imageUrl!:string;
  origins!:string[];
  cookTime!:string;
}
