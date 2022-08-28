import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTankReducer from './tanks/tank.reducer';
import * as fromUserReducer from './user/user.reducer';

export const userState = createFeatureSelector<fromUserReducer.UserState>('UserState');
export const tankState = createFeatureSelector<fromTankReducer.TankState>('tanks');

export const selectUser = createSelector (
  userState, 
  (elements) => {
    if(elements?.entities){
      const allUsers = Object.values(elements.entities)
      return allUsers[0]
    }else{
      return null;
    }
  }
)

export const userIsAuthenticated = createSelector (
  selectUser, 
  (user) => {
    if(user){
      return true
    }else{
      return false
    }
  }
)

export const { selectAll, selectEntities, selectIds, selectTotal } =
  fromTankReducer.adapter.getSelectors(tankState);

export const selectEntity = (id: string | number) =>
  createSelector(selectEntities, (entities) => entities[id]);

export const selectIdRef = createSelector (tankState, (state) => state.tankRefId);


