import { AuthService } from './../../services/auth.service';
import { MiscService } from './../../services/misc.service';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { tokenSet } from '../token/token.actions';
import { AuthActionTypes } from './auth.actions';
import { UserActionTypes } from '../user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthEffectsService {

  constructor(
    private actions$: Actions,
    private store: Store,
    private misc: MiscService,
    private authService: AuthService
  ) {}

  loginApi = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.AuthLogin),
      switchMap((action) => {
        return this.authService.loginApi(action.data).pipe(
          map((res: any) => {
            if (res?.token) {
              const item = res?.token;
              this.store.dispatch(tokenSet({ item }));
              localStorage.setItem('token_dp', JSON.stringify(item))
            }
            if (res?.results) {
              const user = { ...res?.results, id: res?.results?._id };
              this.store.dispatch(UserActionTypes.UserSetStore({ user }));
            }
            return res;
          }),
          catchError((err) => {
            console.log(err);
            

            return of({ error: true, message: 'Usuário e/ou senha inválidos' })

          } )
        );
      }),
      map((res) => {
        console.log('-', res);

        if (this.misc.checkError(res)) {
          this.misc.notificacao(res?.message);
          return AuthActionTypes.AuthLoginError();
        } else {
          this.misc.notificacao(res?.message);
          return AuthActionTypes.AuthLoginSuccess();
        }
      })
    )
  );

  loginApiGoogle = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.AuthLoginGoogle),
      switchMap((action) =>
        this.authService.loginGoogleApi(action.data).pipe(
          map((res: any) => {
            if (res?.token) {
              const item = res?.token;
              this.store.dispatch(tokenSet({ item }));
              localStorage.setItem('token_dp', JSON.stringify(item))
            }
            if (res?.results) {
              const user = { ...res?.results, id: res?.results?._id };
              this.store.dispatch(UserActionTypes.UserSetStore({ user }));
            }
            return res;
          }),
          catchError((err) => {
            console.log('err',  err);
            
            return of({ error: true, message: 'Tente novamente, ocorreu um error' })
          } )
        )
      ),
      map((res) => {
        if (this.misc.checkError(res)) {
          this.misc.notificacao(res?.message);
          return AuthActionTypes.AuthLoginGoogleError();
        } else {
          this.misc.notificacao(res?.message);
          return AuthActionTypes.AuthLoginGoogleSuccess();
        }
      })
    )
  );
}
