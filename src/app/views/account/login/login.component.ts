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
  signIn = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  signUp = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
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

  createUser(){
    const user = this.signUp.value;
    this.store.dispatch(UserActionTypes.UserSetData({user}))
    
  }

  openGoogleLogin() {
    this.authService.popupGoogle().then((res)=>{
      this.getUser(res)
    })
  }

  getUser(data: any){
    this.authService.loginGoogleApi(data).subscribe((res)=>{
      console.log('res api', res);
      
    })

  }
}
