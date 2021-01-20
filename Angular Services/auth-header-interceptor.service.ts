import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor {

  constructor(private tokenStorage:TokenStorageService) { }

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler)
    :Observable<import("@angular/common/http").HttpEvent<any>> 
   {
     const token = this.tokenStorage.getToken();
     const clonedRequest = req.clone({
       headers: req.headers.set("Authorization", token ? `Bearer ${token}` : "")
     });
        return next.handle(clonedRequest); 
   }


}



/*
in app.module.ts on client end, add following below imports -

providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptorService,
      multi: true,
    }]
*/