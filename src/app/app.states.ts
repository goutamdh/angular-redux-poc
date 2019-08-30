import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AuthState, authReducer } from './auth/store/auth.reducer';

// Register all app states
export interface AppState {
    authState: AuthState;
}

// Register all reducers
export const reducers: ActionReducerMap<any> = {
    auth: authReducer,
};

// Selector for auth
export const getAuthState = createFeatureSelector<AuthState>('auth');
