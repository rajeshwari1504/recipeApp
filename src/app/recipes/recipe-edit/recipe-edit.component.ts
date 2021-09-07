import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm !: FormGroup
  constructor(private route: ActivatedRoute, private recipeservice: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        this.initForm();
      }
    )
  }
  onSubmit() {
    // const newRecipe= new Recipe(
    // this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients'],

    if (this.editMode) {
      this.recipeservice.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeservice.addRecipe(this.recipeForm.value)
    }
    this.onCancle();
  }
  ondeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onCancle() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipes = this.recipeservice.getRecipe(this.id)
      recipeName = recipes.name;
      recipeImagePath = recipes.imagepath;
      recipeDescription = recipes.description;
      if (recipes['ingredients']) {
        for (let ingredient of recipes.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagepath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


}
