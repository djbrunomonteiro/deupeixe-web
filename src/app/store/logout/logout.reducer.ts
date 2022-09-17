import { Action, ActionReducer, MetaReducer } from "@ngrx/store";
import { AppState } from "../app.state";

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<any> {
  return function(state: any, action: Action): AppState {
    if (action.type === 'CLEAR_STATE') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<AppState>[] = [clearState];