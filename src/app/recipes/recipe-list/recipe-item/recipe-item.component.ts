import { Component, Input, OnInit, Output, SimpleChange,EventEmitter } from '@angular/core';

import { Recipe } from '../../recipe.module';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  // providers:[RecipeService]
})
export class RecipeItemComponent  {
  // [x: string]: Recipe;
@Input() recipe!:Recipe;
@Input()index!:number;
// @Output() recipeSelected=new EventEmitter<void>()
  constructor() {
   
    //  this.recipe=
   }
   ngOnChanges(chanage:SimpleChange){
     console.log(chanage);
     
   }
  //  onselected(){
  //   //  this.recipeSelected.emit()
  //   this.recipeservice.recipeSelected.emit(this.recipe)
  //  }
 }
   
  


