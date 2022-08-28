import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserActionTypes } from 'src/app/store/user/user.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  viewSelect: string = 'login';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {

  }

  loginGoogle() {
    
    this.authService
      .loginGoogle()
      .then((res: any) => {
        if (!res.uid) {return;}
        this.store.dispatch(UserActionTypes.UserGet({id: res.uid}));
        this.router.navigate(['/'])
      })
      .catch(err => console.error(err))

  }
}
