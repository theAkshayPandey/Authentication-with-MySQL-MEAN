import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { of, Subject, throwError, EMPTY } from 'rxjs';
import { switchMap, catchError } from "rxjs/operators";
import { TokenStorageService } from './token-storage.service';


interface UserDto{
  user: User,
  token: string,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, private tokenStorage :TokenStorageService) { }

  private _user = new Subject<User>();
  private apiUrl = 'http://localhost:4050/api/auth/';
 
  get user(){
    return this._user.asObservable();
  }
  
  register(userToSave: any) {
    
    return this.httpClient.post<any>(`${this.apiUrl}register`,userToSave).pipe
    (switchMap(({user, token})=>{
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log(`user registered successfully`, user);
        return of (user);
      }),
      catchError(e=>{
        return throwError(`Registration failed ..`);
        
      })
    );

  }

  findMe(){
    const token = this.tokenStorage.getToken();
    if (!token) {
      return EMPTY;
    }
    return this.httpClient.get<any>(`${this.apiUrl}findme`).pipe(
          switchMap(({user}) => {
            this.setUser(user);
            console.log(`user found`, user);
            return of(user);
          }),
      catchError(e => {
        console.log(e);
            return throwError(`Your login not found. Try again.`);
          })
        );

  }


  login(email: string, password: string) {
    const loginCredentials = {email, password};

    return this.httpClient
      .post<UserDto>(`${this.apiUrl}login`,loginCredentials)
      .pipe(switchMap(({ user, token }) => {
          this.setUser(user);
          this.tokenStorage.setToken(token);
          console.log(`user found`, user);
          return of(user);
        }),
          catchError(e=>{
            return throwError(`Your login not found. Try again`);
          })
        )
  }

  logout(){
    //remove user from subject
    this.tokenStorage.removeToken();
    this.setUser(null);
  }

  private setUser(user){
    this._user.next(user);
  }
}
