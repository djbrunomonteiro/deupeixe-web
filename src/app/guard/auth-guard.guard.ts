import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { userIsAuthenticated } from '../store/app-selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isAuth = false;
  constructor(
    private store: Store,
    private routes: Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.store.select(userIsAuthenticated).subscribe((res)=>{
        this.isAuth = res;
        if(!this.isAuth){
          this.routes.navigate(["/login"], {queryParams: {returnUrl:state.url}});
        }

      })

      

    return this.isAuth;
  }
  
}
