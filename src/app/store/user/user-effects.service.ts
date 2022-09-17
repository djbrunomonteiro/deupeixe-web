import { MiscService } from './../../services/misc.service';
import { Store } from '@ngrx/store';
import { UserService } from './../../services/user.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { UserActionTypes } from './user.actions';
import { tokenSet } from '../token/token.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffectsService {
  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store,
    private misc: MiscService
  ) {}

  getUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.UserGet),
      switchMap((action) =>
        this.userService.getOne(action.id).pipe(
          map((res: any) => {
            const data = { ...res.results, id: res.results?._id };
            this.store.dispatch(UserActionTypes.UserSetStore({ user: data }));
            return res;
          }),
          catchError((err) => of({ error: true, message: err }))
        )
      ),
      map((res) => {
        if (this.misc.checkError(res)) {
          this.misc.notificacao(res?.message);
          return UserActionTypes.UserError();
        } else {
          return UserActionTypes.UserSuccess();
        }
      })
    )
  );

  setItem = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.UserSetData),
      switchMap((action) => {
        return this.userService.addOne(action.user).pipe(
          map((res: any) => {
            if (res?.results) {
              const data = { ...res.results, id: res.results?._id };
              this.store.dispatch(UserActionTypes.UserSetStore({ user: data }));
            }
            if(res?.token){
              this.store.dispatch(tokenSet({ item: res?.token}));
            }
            return res;
          }),
          catchError((err) => of({ error: true, message: err }))
        );
      }),
      map((res) => {
        if (this.misc.checkError(res)) {
          this.misc.notificacao(res?.message);
          return UserActionTypes.UserError();
        } else {
          this.misc.notificacao(res?.message);
          return UserActionTypes.UserSuccess();
        }
      })
    )
  );
}
