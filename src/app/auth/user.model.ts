export class User{
     private _token: any;
     _tokenExpirationDate: any;
constructor(
    public email:string,
    public id:string,
    private_token:string,
    private_tokenExpirationDate:Date)
    {}
    get token(){
        if(!this._tokenExpirationDate ||new Date() >this._tokenExpirationDate){
           return null;
        }
        return this._token
    }
}