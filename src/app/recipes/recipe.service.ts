import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.module";
@Injectable()
//   {
//   providedIn:'root'}
// )

export class RecipeService {
  recipeSelected = new Subject<Recipe>()
  recipechanged = new Subject<Recipe[]>()
  // private recipes: Recipe[] = [
  //   new Recipe('A test recipe', ' sweets', 'https://th.bing.com/th/id/OIP.Iso23ghxw-q2PTTohrmbPAHaEK?w=316&h=180&c=7&o=5&pid=1.7',
  //     [new Ingredient('fired rice', 1),
  //     new Ingredient('patato', 3)]),
  //   new Recipe('B test recipe', '  PANNER', 'https://th.bing.com/th/id/OIP.DH0KMPXHqWYW28hEc7OXLQHaE8?w=266&h=180&c=7&o=5&pid=1.7', [new Ingredient('noodals', 11), new Ingredient('sweet', 55)]),
  //   // new Recipe('B test recipe',' PIZZA','https://th.bing.com/th/id/OIP.Iso23ghxw-q2PTTohrmbPAHaEK?w=316&h=180&c=7&o=5&pid=1.7',[]),
  //   // new Recipe('B test recipe','  Ice-Cream','https://th.bing.com/th/id/OIP.4ZwvzorGIMJkcgXL4OJm0QHaHa?w=182&h=182&c=7&o=5&pid=1.7',[]),
  //   // new Recipe('B test recipe','  dry furits','https://th.bing.com/th/id/OIP.JrnWF-K3l6yFUIf9tkL71AHaEK?w=297&h=180&c=7&o=5&pid=1.7',[]),
  //   // new Recipe('B test recipe','  rice','https://th.bing.com/th/id/OIP.hJkRxJ-3iQ6fr1B1qJeaQQHaFj?w=232&h=180&c=7&o=5&pid=1.7',[])
  // ];
  private recipes: Recipe[]=[];
  constructor(private slService: ShoppingListService) { }
   
  setRecipe(recipe:Recipe[]){
    this.recipes=recipe;
    this.recipechanged.next(this.recipes.slice());

  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index]
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
    console.log(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipechanged.next(this.recipes.slice())
  }
  updateRecipe(inedx: number, newRecipe: Recipe) {
    this.recipes[inedx] = newRecipe;
    this.recipechanged.next(this.recipes.slice())
  }
  DeleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipechanged.next(this.recipes.slice())
  }
}