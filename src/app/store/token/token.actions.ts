import { createAction, props } from '@ngrx/store';

export const tokenSet = createAction (
    '[Set Token]', props<{item: any}>()
);
export const tokenUpdate = createAction (
    '[Token UPDATE]',
    props<{id: string; changes: Partial<any>}>()
);
