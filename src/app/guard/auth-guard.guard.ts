import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private routes: Router,
    private auth: AuthService
    ){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return true
       if(this.auth.checkAuthenticated()){
        return true;
      }else{
        this.routes.navigate(['/login'], {queryParams: {returnUrl:state.url}});
        return false;
      }

  }

}
