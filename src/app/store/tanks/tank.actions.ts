import { createAction, props } from '@ngrx/store';
import { Tank } from 'src/app/models/tank';

export const TanksAll = createAction (
    '[TANKSALL] Get ALl Tanks'
);

export const SetTanksAll = createAction (
    '[SETTANKSALL] Set store',
    props<{tanks: Tank[]}>()
);

export const SuccessGetTanks = createAction (
    '[SUCCESS GET TANKS]',
)
export const ErrorGetTanks = createAction (
    '[SUCCESS GET TANKS]',
)

export const GetTank = createAction (
    '[GETTANK] Data base',
    props<{tanks: Tank}>()
);


export const SetNewTank = createAction (
    '[SetNewTank] Data base',
    props<{tank: Tank}>()
)

export const SetNewTankStore = createAction (
    '[SetNewTank] Store',
    props<{tank: Tank}>()
)


export const SuccessSetTank = createAction (
    '[SuccessSetTank]',
)
export const ErrorSetTank = createAction (
    '[ErrorSetTank]',
)

export const TankUpdate = createAction (
    '[TANKUPDATE] Update of Tank',
    props<{id: string, tank: Partial<Tank>}>()
)

export const TankDelete = createAction (
    '[TANKDELETE] Delete of Tank',
    props<{tank: {id: string}}>()
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
    SetTanksAll,
    SuccessGetTanks,
    ErrorGetTanks,
    SetNewTank,
    SetNewTankStore,
    SuccessSetTank,
    ErrorSetTank,
    TankDelete,
    TankUpdate,
    SetIdRef,
    ErrorStatus,

}