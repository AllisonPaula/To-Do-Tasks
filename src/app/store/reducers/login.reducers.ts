import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from '../actions/login.actions';

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(login, state => ({ ...state, error: null })),
  on(loginSuccess, state => ({ ...state, isAuthenticated: true })),
  on(loginFailure, (state, { error }) => ({ ...state, error }))
);