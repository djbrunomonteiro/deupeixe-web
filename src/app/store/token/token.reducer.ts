import { tokenSet, tokenUpdate } from './token.actions';
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export interface TokenState extends EntityState<any>{};

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const inititalState: TokenState = adapter.getInitialState({
});

export const TokenReducer = createReducer(
    inititalState,

    on(tokenSet, (state, action)=>{
        return adapter.addOne(action.item, state);
    }),
    on(tokenUpdate, (state, action: any)=>{
        return adapter.updateOne({id: action.id, changes: action.changes}, state);
    }),

);
