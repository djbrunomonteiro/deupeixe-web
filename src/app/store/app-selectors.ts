import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTankReducer from './tanks/tank.reducer';
import * as fromUserReducer from './user/user.reducer';
import * as fromTokenReducer from './token/token.reducer';

export const userState =
  createFeatureSelector<fromUserReducer.UserState>('userState');
export const tankStateRef =
  createFeatureSelector<fromTankReducer.TankState>('tanks');
export const tokenStateRef =
  createFeatureSelector<fromTokenReducer.TokenState>('tokenState');

export const selectTokenState = createSelector(tokenStateRef, (elements) => {
  const all = Object.values(elements.entities);
  return all;
});

export const selectToken = createSelector(selectTokenState, (elements) => {
  if (elements.length) {
    return elements[0];
  } else {
    return null;
  }
});

export const selectAuthenticated = createSelector(selectToken, (token) => {
  if (token) {
    return true;
  } else {
    return false;
  }
});

export const selectUser = createSelector(userState, (elements) => {
  if (elements?.entities) {
    const allUsers = Object.values(elements.entities);
    return allUsers[0];
  } else {
    return null;
  }
});

export const selectTanks = createSelector(tankStateRef, (elements) => {
  const all = Object.values(elements.entities);
  return all ? all : [];
});
