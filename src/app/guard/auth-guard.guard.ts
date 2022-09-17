import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { selectAuthenticated } from '../store/app-selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private store: Store,
    private routes: Router,
    private auth: AuthService
    ){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
       if(this.auth.checkAuthenticated()){
        console.log(route.url);
        return true;
      }else{
        this.routes.navigate(['/login'], {queryParams: {returnUrl:state.url}});
        return false;
      }

  }

}
