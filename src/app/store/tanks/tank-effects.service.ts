import { MiscService } from './../../services/misc.service';
import { TankService } from './../../services/tank.service';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, of, switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TankActionTypes, SetNewTankStore } from './tank.actions';


@Injectable({
  providedIn: 'root',
})
export class TankEffectsService {
  constructor(
    private tankService: TankService,
    private actions$: Actions,
    private store: Store,
    private misc: MiscService
  ) {}

  getAll = createEffect(() =>
    this.actions$.pipe(
      ofType(TankActionTypes.TanksAll),
      switchMap(() => {
        return this.tankService.getAll().pipe(
          map((res: any) => {
            switch (res?.status) {
              case 200:
                if(res.results?.length){
                  const tanks = res.results.map((elem: any) =>({...elem, id: elem?._id}));
                  this.store.dispatch(TankActionTypes.SetTanksAll({ tanks }));

                }
                break;
              case 401:
                this.misc.notificacao(res?.message);
                console.error(res);
                break;
            }
            return res;
          }),
          catchError((err) => {
            console.error(err);
            return of({
              error: true,
              message: 'Ocorreu um error ao obter dados',
            });
          })
        );
      }),
      map((res) => {
        if (this.misc.checkError(res)) {
          return TankActionTypes.ErrorGetTanks();
        } else {
          return TankActionTypes.SuccessGetTanks();
        }
      })
    )
  );

  setNewOne = createEffect(() =>
    this.actions$.pipe(
      ofType(TankActionTypes.SetNewTank),
      switchMap((action) =>
        this.tankService.addOne(action.tank).pipe(
          map((res: any) => {
            switch (res?.status) {
              case 200:
                const tank = {...res.results, id: res.results?._id};
                this.store.dispatch(TankActionTypes.SetNewTankStore({ tank }));
                this.misc.notificacao(res?.message);
                break;
              case 500:
                this.misc.notificacao(res?.message);
                console.error(res);
                break;
            }
            return res;
          }),
          catchError((err) => {
            console.error(err);
            return of({
              error: true,
              message: 'Ocorreu um error salvar dados',
            });
          })
        )
      ),
      map((res) => {
        if (this.misc.checkError(res)) {
          return TankActionTypes.ErrorSetTank();
        } else {
          return TankActionTypes.SuccessSetTank();
        }
      })
    )
  );
}
