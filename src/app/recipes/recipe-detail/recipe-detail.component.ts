import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  // providers:[RecipeService]
})
export class RecipeDetailComponent implements OnInit {
 recipe!:Recipe;
 id !:number;
  constructor(private recipeService:RecipeService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    // const id=this.route.snapshot.params['id']
    this.route.params.subscribe(
    (param:Params)=>{
      // console.log(param)
      this.id= +param['id'];
      // console.log(this.id);
      this.recipe=this.recipeService.getRecipe(this.id)
    }
    );
  }
  onAddShoppingList(){
  this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)
  }
  onEditRecipe(){
   this.router.navigate(['edit'],{relativeTo:this.route})
  }
  onDelete(){
    this.recipeService.DeleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
