import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ user: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());