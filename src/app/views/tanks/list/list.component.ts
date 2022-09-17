import { Tank } from './../../../models/tank';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppComponent } from './../../../app.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public appComponent: AppComponent,
  ) {}

  ngOnInit(): void {

  }

  logOut() {
    console.log('logout');
    this.authService.logOut();
  }
}
