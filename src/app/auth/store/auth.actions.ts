import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    SIGNIN = '[AUTH] Signin',
    SIGNIN_SUCCESS = '[AUTH] SigninSuccessAction',

    SIGNOUT = '[AUTH] SignoutAction',
    SIGNOUT_SUCCESS = '[AUTH] SignoutSuccessAction',

    AUTHORIZE = '[AUTH] AuthorizeAction',

    GET_AUTH_INFO = '[AUTH] GetAuthInfoAction',
    GET_AUTH_INFO_SUCCESS = '[AUTH] GetAuthInfoSuccessAction',

    FORGOT_PASSWORD = '[AUTH] ForgotPasswordAction',

    AUTH_ERROR = '[AUTH] AuthErrorAction',
}

export class SigninAction implements Action {
    readonly type = AuthActionTypes.SIGNIN;
    constructor(public payload: any) { }
}

export class SigninSuccessAction implements Action {
    readonly type = AuthActionTypes.SIGNIN_SUCCESS;
    constructor(public payload: any) { }
}

export class SignoutAction implements Action {
    readonly type = AuthActionTypes.SIGNOUT;
}

export class SignoutSuccessAction implements Action {
    readonly type = AuthActionTypes.SIGNOUT_SUCCESS;
}

export class AuthorizeAction implements Action {
    readonly type = AuthActionTypes.AUTHORIZE;
}

export class GetAuthInfoAction implements Action {
    readonly type = AuthActionTypes.GET_AUTH_INFO;
    // constructor(public payload: any) { }
}

export class GetAuthInfoSuccessAction implements Action {
    readonly type = AuthActionTypes.GET_AUTH_INFO_SUCCESS;
    constructor(public payload: any) { }
}

export class ForgotPasswordAction implements Action {
    readonly type = AuthActionTypes.FORGOT_PASSWORD;
}

export class AuthErrorAction implements Action {
    readonly type = AuthActionTypes.AUTH_ERROR;
    constructor(public payload: any) { }
}
