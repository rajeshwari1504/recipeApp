import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";
import { User } from "./user.model";


 export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?:boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user=new Subject<User>();
    
    // user=new BehaviorSubject<User>();

    // user=new BehaviorSubject<User>({_token:null,_tokenExpirationDate:null,email:'',id:'',token:''});
    constructor(private http: HttpClient,private router:Router) { 
        this.user.subscribe({
        next: (v) => console.log(v)
      });
     }


    SignUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBI_kGIScpLuVS-Tbfp-sWE96bq-xuigHk',
            {
                email: email,
                password: password,
                returnSecureToken: true

             }).pipe(catchError(this.handleError)
             ,tap(resData =>this.handleAuthentication(resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn)))
              }

    Login(email:string,password:string){
     return   this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBI_kGIScpLuVS-Tbfp-sWE96bq-xuigHk',
        {
            email: email,
            password: password,
            returnSecureToken: true

        }).pipe(catchError(this.handleError),
        tap(resData =>this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)))
        }
    private handleAuthentication(email: string,token:string,userId:string,expiresIn:number){
        const expirationdate=new Date(new Date().getTime()+ +expiresIn *1000);
        const user=new User(
            email,
            userId,
            token,
            expirationdate
            );
            this.user.next(user)
            console.log(user)
             
        
    }
    logOut(){
        this.user.next();
        this.router.navigate(['/auth'])
    }
    private handleError(errorRes:HttpErrorResponse){
        let errorMessage = "An unKnown Error occurred"

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'this email  exists already ';
                break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'this email  does not exists ';
                    break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'this Password  does not correct ';
                        break;
                

        }
        return throwError(errorMessage)
    
    }
}