import { Store } from '@ngrx/store';
import { UserService } from './../../services/user.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, EMPTY } from 'rxjs';
import { UserActionTypes } from './user.actions';
import { IUser } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserEffectsService {

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store
  ) { }

  getUser = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActionTypes.UserGet),
    switchMap((action) => {
      console.log(action);
      
      return this.userService.getOne(action.id).pipe(
        map((res: any) => {
          console.log(`gettt`, res);
          this.store.dispatch(UserActionTypes.UserSetStore({user: res}))
        }),
        catchError((err) =>{
          console.log(err); 
          this.store.dispatch(UserActionTypes.UserError())           
          return err
        })
      );
    }),
    map(() => UserActionTypes.UserSuccess())
  )
);

  setItem = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActionTypes.UserSetData),
    switchMap((action) => {
      return this.userService.addOne(action.user).pipe(
        map((res: any) => res.results),
        map((user: any) => {
          if(user){
            this.store.dispatch(UserActionTypes.UserSetStore({user}))
          }

        }),
        catchError((err) =>{
          console.log(err); 
          this.store.dispatch(UserActionTypes.UserError())           
          return err
        })
      )
    }),
    map(() => UserActionTypes.UserSuccess())
  )
);


}
