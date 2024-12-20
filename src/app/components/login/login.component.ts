import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions/login.actions';
import { AuthState } from '../../store/reducers/login.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<{ auth: AuthState }>) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { user, password } = this.loginForm.value;
    this.store.dispatch(login({ user, password }));
  }
}