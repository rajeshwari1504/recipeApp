import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  private igChangeSub!: Subscription;
 ingredients :Ingredient[]=[
//   new Ingredient('apple',3),
//   new Ingredient('papaya',5),
//   new Ingredient('orange',4)
 ];
  constructor( private shoppingservice:ShoppingListService) 
  {}

  ngOnInit(){
    this.ingredients=this.shoppingservice.getIngredient();
    this.igChangeSub=this.shoppingservice.ingredientedchange
    .subscribe((ingredients:Ingredient[]) => {
      this.ingredients=ingredients});
      // console.log(this.ingredients=this.ingredients);

  }
  // oningeridentAdded(ingredient:Ingredient){
  //   this.Ingredients.push(ingredient)

  // }
  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }
  onEditList(index:number){
 this.shoppingservice.EditListchange.next(index)
  }
  
}
