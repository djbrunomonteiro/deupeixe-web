import { Store } from '@ngrx/store';
import {
  catchError,
  EMPTY,
  map,
  switchMap,
} from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemService } from 'src/app/services/item.service';
import { Injectable } from '@angular/core';
import {
  TanksAll,
  SetTanksAll,
  TankNew,
  TankUpdate,
  ErrorStatus,
  SetIdRef,
  SuccessGetTanks,
} from './tank.actions';
import { Tank } from 'src/app/models/tank';

@Injectable({
  providedIn: 'root',
})
export class TankEffectsService {
  constructor(
    private itemService: ItemService,
    private actions$: Actions,
    private store: Store
  ) {}

  getItensAll = createEffect(() =>
    this.actions$.pipe(
      ofType(TanksAll),
      switchMap(() => {
        return this.itemService.getItens().pipe(
          map((res: Tank[]) => this.store.dispatch(SetTanksAll({ tanks: res }))),
          catchError((err) =>{
            console.log(err);            
            return EMPTY
          })
        );
      }),
      map(() => SuccessGetTanks())
    )
  );

  setItem = createEffect(() =>
    this.actions$.pipe(
      ofType(TankNew),
      switchMap((action) => {
        return this.itemService.addItem(action)
          .then((res: any)=> {
            TanksAll();
            return SetIdRef({id: res})
          })
          .catch((err)=>ErrorStatus({msg: err}))
      })
    )
  );

  updateItem = createEffect(() =>
    this.actions$.pipe(
      ofType(TankUpdate),
      switchMap((action) => {
        return this.itemService.updateItem(action.tank)
          .then((res: any)=> {
            return SetIdRef({id: res})
          })
          .catch((err)=>ErrorStatus({msg: err}))
      })

    )
  );
}
