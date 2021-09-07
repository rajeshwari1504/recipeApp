import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.module";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private httpclient: HttpClient, private recipeservice: RecipeService ,private authservice:AuthService) {
        this.authservice.user.subscribe({
            next: (v) => console.log(v)
          });
     }

    stroageRecipe() {
        const recipes = this.recipeservice.getRecipes();
        this.httpclient.put('https://ng-course-recipe-6ea32-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            (response) => {
                console.log(response);

            })
    }
    fetchingRecipe() {
        console.log(this.authservice.user)
         
        this.authservice.user.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
  });   
        /*  this.authservice.user.subscribe(userl =>{
        // return  this.authservice.user.pipe(take(1),exhaustMap(user =>{ 
            console.log(userl)  
        },err=>{
            console.log(err)
        })  */    
       /*return this.httpclient.get<Recipe[]>('https://ng-course-recipe-6ea32-default-rtdb.firebaseio.com/recipes.json'
    //    ,{
    //           params:new HttpParams().set('auth',user.token)

    //    }
       )
        .pipe(map((recipes) => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
            tap(recipes =>{
                this.recipeservice.setRecipe(recipes)
                console.log(recipes)

            })
            )*/
         
    }
}