import { ActionReducerMap } from '@ngrx/store';

import * as fromTankReducer from './tanks/tank.reducer';
import * as fromUserReducer from './user/user.reducer'
import * as fromTokenReducer from './token/token.reducer';


export interface AppState{
    userState: fromUserReducer.UserState,
    tokenState: fromTokenReducer.TokenState;
    tankState: fromTankReducer.TankState;

}

export const appReducers: ActionReducerMap<AppState> = {
    userState: fromUserReducer.userReducer,
    tankState: fromTankReducer.tankReducer,
    tokenState: fromTokenReducer.TokenReducer,
}


