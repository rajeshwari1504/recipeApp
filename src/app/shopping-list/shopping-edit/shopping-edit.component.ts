import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slEdit !:NgForm
  // @ViewChild('nameInput') nameInputRef!: ElementRef;
  // @ViewChild('amountInput') amountInputRef!: ElementRef;
  // @Output() ingeridentAdded=new EventEmitter <Ingredient>();
  subscription !:Subscription;
  editmode=false;
  editedItemIndex !:number;
  editItem !:Ingredient;

  constructor(private shoppingservice:ShoppingListService) {
     }
  

  ngOnInit(): void {
  this.subscription =this.shoppingservice.EditListchange.subscribe((index:number)=>{
    this.editedItemIndex=index
    this.editmode=true;
    this.editItem=this.shoppingservice.getIngredients(index)
    this.slEdit.setValue({
    name:this.editItem.name,
    amount:this.editItem.amount
  })
  })
  }
  onAddItem(form:NgForm){
    const value=form.value
    // const ingName=this.nameInputRef.nativeElement.value
    // const ingAmount=this.amountInputRef.nativeElement.value
    const newingredient = new Ingredient(value.name ,value.amount);
    console.log(value.name)
    // this.ingeridentAdded.emit(newingredient);
      // this.ingeridentAdded.emit(newingredient);
    
      if(this.editmode){
        this.shoppingservice.UpdateIngrident(this.editedItemIndex,newingredient)
      }
      else{
        this.shoppingservice.addIngredient(newingredient)
      }
      this.editmode=false;
      form.reset()
}
ngOnDestroy(){
  this.subscription.unsubscribe();
}
onClear(){
  this.slEdit.reset();
  this.editmode=false;
}
onDelete(){
  this.shoppingservice.DeleteIngredients(this.editedItemIndex)
  this.onClear()
}
}
