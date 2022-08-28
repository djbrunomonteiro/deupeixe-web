import { createAction, props } from '@ngrx/store';
import { Tank } from 'src/app/models/tank';

export const TanksAll = createAction (
    '[TANKSALL] Get ALl Tanks'
);

export const GetTank = createAction (
    '[GETTANK] Get Tank ID',
    props<{tanks: Tank}>()
);

export const SetTanksAll = createAction (
    '[SETTANKSALL] Set ALl Tanks',
    props<{tanks: Tank[]}>()
);

export const TankNew = createAction (
    '[TANKNEW] Create new Tank',
    props<{tank: Tank}>()
)

export const TankUpdate = createAction (
    '[TANKUPDATE] Update of Tank',
    props<{id: string, tank: Partial<Tank>}>()
)

export const TankDelete = createAction (
    '[TANKDELETE] Delete of Tank',
    props<{tank: {id: string}}>()
)

export const SuccessGetTanks = createAction (
    '[SUCCESS GET TANKS] Success Get Tanks',
)

export const SetIdRef = createAction (
    '[SET ID REF] Set Id Ref',
    props<{id: string}>()
)

export const ErrorStatus = createAction (
    '[ERROR] Error',
    props<{msg: String}>()
)

export const TankActionTypes = {
    TanksAll,
    TankNew,
    TankUpdate,
    TankDelete,
    SetTanksAll,
    SuccessGetTanks,
    SetIdRef,
    ErrorStatus
}