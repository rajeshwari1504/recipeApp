import { Component ,EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles:[`.dropdown{
        position: relative;
        float: right;
      }
      .open .dropdown-menu {
            display: initial !important;
        }
      
      `]
})
export class HeaderComponent implements OnInit,OnDestroy{
 
  private userSub!:Subscription
  isAuthenticated=false


  constructor(private datastorage:DataStorageService,private authservice:AuthService){}
  ngOnInit(){
  this.userSub =  this.authservice.user.subscribe(user=>
    {
      this.isAuthenticated= !user? false :true;//!!user
      console.log(false);//!user
      console.log(true);//!!user
    })
  }

  onSaveData(){
    this.datastorage.stroageRecipe();
  }
  onfetchData(){
    this.datastorage.fetchingRecipe()

  }
  onLogOut(){
    this.authservice.logOut();
  }
 ngOnDestroy(){
   this.userSub.unsubscribe();
 }

}