import { AuthActionTypes } from './../../../store/auth/auth.actions';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserActionTypes } from 'src/app/store/user/user.actions';
import { skip } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signIn = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  signUp = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  viewSelect: string = 'login';

  loading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private Actions$: Actions
  ) { }

  ngOnInit(): void { }

  loginApi() {
    const data = this.signIn.value;
    this.loading = true;
    this.store.dispatch(AuthActionTypes.AuthLogin({ data }));
    this.Actions$.pipe(skip(1)).subscribe((res) => {
      if (res.type === '[AUTHLOGINGOOGLE SUCCESS]') {
        this.loading = false;
        this.signUp.reset();
      }
      if (res.type === '[AUTHLOGINGOOGLE ERROR]') {
        this.loading = false;
      }
    });
  }

  async openPopUpGoogle() {
    const data = await this.authService.popupGoogle()
    this.loginApiGoogle(data);
  }

  loginApiGoogle(data: any) {
    this.loading = true;

    if (data) {
      this.store.dispatch(AuthActionTypes.AuthLoginGoogle({ data }));
      this.Actions$.pipe(skip(1)).subscribe((res) => {
        if (res.type === '[AUTHLOGINGOOGLE SUCCESS]') {
          this.router.navigate(['/dashboard'])
        }
        this.loading = false;
      });
    }
  }

  createUser() {
    this.loading = true;
    const user = this.signUp.value;
    this.store.dispatch(UserActionTypes.UserSetData({ user }));
    this.Actions$.subscribe((res) => {
      if (res.type === '[USERSETSTORE]') {
        this.loading = false;
        this.signUp.reset();
      }
      if (res.type === '[USERERROR]') {
        this.loading = false;
      }
    });
  }

  createUserFromGoogle() {
    this.authService.popupGoogle().then((res) => {
      const user = res;
      if (user) {
        this.store.dispatch(UserActionTypes.UserSetData({ user }));
        this.Actions$.subscribe((res) => {
          if (res.type === '[USERSETSTORE]') {
            this.loading = false;
            this.signUp.reset();
          }
          if (res.type === '[USERERROR]') {
            this.loading = false;
          }
        });
      }
    });
  }
}
