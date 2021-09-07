import { Injectable, Injector } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.module";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn:'root'
})
export class RecipesResolverService  {
    constructor(private datastorage:DataStorageService,private recipeservice:RecipeService){}

    // resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    //     const recipe=this.recipeservice.getRecipes();
    //     if(recipe.length === 0){
    //    return this.datastorage.fetchingRecipe()
    //     }else{
    //       return recipe;
    //     }
    // }
}