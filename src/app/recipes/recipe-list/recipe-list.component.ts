import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Recipe} from '../recipe.module'
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  //  providers:[RecipeService]
})
export class RecipeListComponent implements OnInit,OnDestroy {
  // @Output() recipeWasSelected=new EventEmitter<Recipe>();
  subcription!:Subscription;
  recipes:Recipe[]=[
    // new Recipe('A test recipe',' sweets','https://get.pxhere.com/photo/white-sweet-dish-food-produce-dessert-cuisine-delicious-asian-food-sugar-sweets-tasty-candy-indian-sweetness-chinese-food-southeast-asian-food-steamed-rice-indian-cuisine-rasgula-sweetball-tangyuan-1236064.jpg'),
    // new Recipe('B test recipe','  PANNER','https://th.bing.com/th/id/OIP.DH0KMPXHqWYW28hEc7OXLQHaE8?w=266&h=180&c=7&o=5&pid=1.7'),
    // new Recipe('B test recipe',' PIZZA','https://th.bing.com/th/id/OIP.Iso23ghxw-q2PTTohrmbPAHaEK?w=316&h=180&c=7&o=5&pid=1.7'),
    // new Recipe('B test recipe','  Ice-Cream','https://th.bing.com/th/id/OIP.4ZwvzorGIMJkcgXL4OJm0QHaHa?w=182&h=182&c=7&o=5&pid=1.7'),
    // new Recipe('B test recipe','  dry furits','https://th.bing.com/th/id/OIP.JrnWF-K3l6yFUIf9tkL71AHaEK?w=297&h=180&c=7&o=5&pid=1.7'),
    // new Recipe('B test recipe','  rice','https://th.bing.com/th/id/OIP.hJkRxJ-3iQ6fr1B1qJeaQQHaFj?w=232&h=180&c=7&o=5&pid=1.7')
  ];
  constructor(private recipeservice:RecipeService,
    private router:Router,
    private route:ActivatedRoute ) { }

  ngOnInit(): void {
   this.recipes=this.recipeservice.getRecipes();
   this.subcription = this.recipeservice.recipechanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
      }
    )
  }
  // onRecipeSelect(recipe:Recipe){
  // this .recipeWasSelected.emit(recipe);
  // }
  onNewRecipe(){
 this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){
  this.subcription.unsubscribe();
  }
}
