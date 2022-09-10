import { IUser } from './../models/User';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { UserActionTypes } from '../store/user/user.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = environment.apiUrl;

  authGet: any;
  isAuthenticated: boolean = false;

  constructor(
    private afs: Firestore,
    private auth: Auth,
    private router: Router,
    private store: Store,
    private http: HttpClient
  ) {
    this.authGet = getAuth();
  }

  logOut() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  checkAuthenticated() {
    authState(this.authGet).subscribe((res) =>
      res ? (this.isAuthenticated = true) : (this.isAuthenticated = false)
    );
  }

  async popupGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const data = {
        mail: user.email,
        googleToken: credential?.accessToken,
      };
      this.checkAuthenticated();
      return data;
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      this.checkAuthenticated();
      return error.message;
      // ...
    })

  }

  loginGoogleApi(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/logingoogle`, data)
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
}
