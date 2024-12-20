import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { login, loginSuccess, loginFailure } from '../actions/login.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ user, password }) => {
        if (user === 'Adopem' && password === '1234') {
          this.router.navigate(['home']);
          return of(loginSuccess());
        } else {
          return of(loginFailure({ error: 'Invalid credentials. Please try again.' }));
        }
      })
    )
  );
}