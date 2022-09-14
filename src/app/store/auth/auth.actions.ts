import { createAction, props } from "@ngrx/store";

export const AuthLogin = createAction (
    '[AUTHLOGIN]',
    props<{data: any}>()
);

export const AuthLoginGoogle = createAction (
    '[AUTHLOGINGOOGLE]',
    props<{data: any}>()
);

export const AuthLoginSuccess = createAction (
    '[AUTHLOGINGOOGLE SUCCESS]',
);
export const AuthLoginError = createAction (
    '[AUTHLOGINGOOGLE ERROR]',
);

export const AuthLoginGoogleSuccess = createAction (
    '[AUTHLOGINGOOGLE SUCCESS]',
);
export const AuthLoginGoogleError = createAction (
    '[AUTHLOGINGOOGLE ERROR]',
);



export const AuthActionTypes = {
    AuthLogin,
    AuthLoginGoogle,
    AuthLoginSuccess,
    AuthLoginError,
    AuthLoginGoogleSuccess,
    AuthLoginGoogleError
}