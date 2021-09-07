import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.module";

export class ShoppingListService {
  ingredientedchange = new Subject<Ingredient[]>();
  EditListchange = new Subject<number>();
  ingeridentAdded = new EventEmitter<Ingredient>();
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 3),
    new Ingredient('papaya', 5),
    new Ingredient('orange', 4)
  ];
  getIngredient() {
    return this.ingredients.slice()
  }
  getIngredients(index: number) {
    return this.ingredients[index]
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientedchange.next(this.ingredients.slice())
  }
  addIngredients(ingredients: Ingredient[]) {
    // for(let ingredient of ingredients){
    //  this.addIngredient(ingredient);
    //  console.log()
    // }
    this.ingredients.push(...ingredients);
    this.ingredientedchange.next(this.ingredients.slice());
    console.log(this.ingredients)
  }
  UpdateIngrident(index: number, newingredient: Ingredient) {
    this.ingredients[index] = newingredient;
    this.ingredientedchange.next(this.ingredients.slice());
  }
  DeleteIngredients(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredientedchange.next(this.ingredients.slice())
  }
}
