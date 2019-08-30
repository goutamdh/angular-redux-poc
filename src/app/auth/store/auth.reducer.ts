import { IUser } from 'src/app/core/interfaces/user.interface';
import { GenericAction } from 'src/app/core/models/generic-action.model';
import { AuthActionTypes } from './auth.actions';

/**
 * Authenticaton state
 */
export interface AuthState {
    // if authenticated, there should be a user object
    user: IUser | null;
    token: string | null;
    // is a user authenticated?
    isAuthenticated: boolean;
    isLoginProgress: boolean;
    // error message
    errorMessage: string | null;
}

/**
 * Initial state
 */
export const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoginProgress: false,
    errorMessage: null
};

/**
 * Reducer to control the action state
 *
 * @param state Auth state
 * @param action Generic action
 */
export function authReducer(state = initialState, action: GenericAction) {
    switch (action.type) {
        case AuthActionTypes.SIGNIN: {
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoginProgress: true,
            };
        }

        case AuthActionTypes.SIGNIN_SUCCESS: {
            // console.log(action.payload);
            return {
                ...state,
                isAuthenticated: true,
                isLoginProgress: false,
                token: action.payload.token,
                errorMessage: null
            };
        }

        case AuthActionTypes.GET_AUTH_INFO_SUCCESS: {
            return {
                ...state,
                user: { ...action.payload }
            };
        }

        case AuthActionTypes.SIGNOUT_SUCCESS: {
            return { ...initialState };
        }

        case AuthActionTypes.AUTH_ERROR: {
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload,
                isLoginProgress: false
            };
        }

        default:
            return state;
    }
}
