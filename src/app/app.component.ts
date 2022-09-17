import { tokenSet } from './store/token/token.actions';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserActionTypes } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'deupeixe-web';

  constructor(
    private auth: AuthService,
    private store: Store
  ){}

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth(){
    const data =  localStorage.getItem('token_dp');

    if(data){
      const token = JSON.parse(data) ;
      this.auth.validationToken(token).subscribe((res)=>{
        switch(res?.error){
          case true:
            this.auth.logOut();
            break;
          case false:
            this.store.dispatch(tokenSet({item: token}))
            this.store.dispatch(UserActionTypes.UserGet({id: token?.id}));
            break;
        }
      })
      // console.log(token);
      
    }
  }
}
