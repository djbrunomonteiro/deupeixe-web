import { Store } from '@ngrx/store';
import { AppComponent } from './../../../app.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TankActionTypes } from 'src/app/store/tanks/tank.actions';
import { selectTanks } from 'src/app/store/app-selectors';
import { ITank } from 'src/app/models/tank';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  tanks = [];

  constructor(
    public authService: AuthService,
    public appComponent: AppComponent,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getTanks();
  }

  getTanks() {
    this.store.dispatch(TankActionTypes.TanksAll());
    this.store.select(selectTanks).subscribe((res: any) => (this.tanks = res))
  }

  logOut() {
    console.log('logout');
    this.authService.logOut();
  }
}
