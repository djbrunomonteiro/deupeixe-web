import { IUser } from './../models/User';
import { Store, props } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, map, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { logoutAction } from '../store/logout/logout.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = environment.apiUrl;

  authGet: any;
  refreshToken: any;

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private afs: Firestore,
    private auth: Auth,
    private router: Router,
    private store: Store,
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {}

  checkAuthenticated(): boolean {
    const data = localStorage.getItem('token_dp');
    if(data){
      const payload = JSON.parse(data);
      const isExpired = this.jwtHelper.isTokenExpired(payload?.token)
      this.isAuthenticated$.next(!isExpired)
    }
    return this.isAuthenticated$.value;
  }

  async popupGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const data = {
          name: user.displayName,
          email: user.email,
          googleToken: credential?.accessToken,
          password: user.uid,
        };
        this.checkAuthenticated();
        return data;
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        this.checkAuthenticated();
        return error.message;
        // ...
      });
  }

  loginApi(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  loginGoogleApi(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/logingoogle`, data);
  }

  validationToken(token: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/validation`, token);
  }

  // loginGoogle(): Promise<any> {
  //   const provider = new GoogleAuthProvider();

  //   return signInWithPopup(this.auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential?.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;

  //       const data: IUser = {
  //         id: user.uid,
  //         name: user.displayName,
  //         email: user.email,
  //         plan: '',
  //         photo: user.photoURL,
  //         fone: user.phoneNumber,
  //         city: '',
  //         country: '',
  //         state: '',
  //       };
  //       console.log(user);

  //       // this.store.dispatch(UserActionTypes.UserSetData({user: data}))
  //       this.checkAuthenticated();
  //       return data;
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       this.checkAuthenticated();
  //       return error.message;
  //       // ...
  //     });
  // }

  logOut() {
    this.isAuthenticated$.next(false);
    localStorage.removeItem('token_dp');
    this.store.dispatch(logoutAction());
    this.router.navigate(['/login']);
  }
}
