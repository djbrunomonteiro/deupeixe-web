import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Tank } from 'src/app/models/tank';
import { TankActionTypes } from './tank.actions';

export interface TankState extends EntityState<Tank> {
  tankRefId: string | null;
}

export const adapter: EntityAdapter<Tank> = createEntityAdapter<Tank>();

export const initialState: TankState = adapter.getInitialState({
  tankRefId: '',
});

export const tankReducer = createReducer(
  initialState,
  on(TankActionTypes.SetTanksAll, (state, action) => {
    return adapter.addMany(action.tanks, state);
  }),

  on(TankActionTypes.TankNew, (state, action) => {
    return adapter.addOne(action.tank, state);
  }),
  on(TankActionTypes.TankDelete, (state, action) => {
    return adapter.removeOne(action.tank.id, state);
  }),
  on(TankActionTypes.TankUpdate, (state, action) => {
    return adapter.updateOne({ id: action.id, changes: action.tank }, {...state, tankRefId: action.id});
  }),
  on(TankActionTypes.SetIdRef, (state, action) => {
    return {...state, tankRefId: action.id}
  }),


);
