import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MaterialsharedModule } from './modules/materialshared/materialshared.module';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';

import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';   
import { provideDatabase } from '@angular/fire/database';   
import { getDatabase } from '@firebase/database';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

import { appReducers } from './store/index';
import { environment } from 'src/environments/environment';
import { TankEffectsService } from './store/tanks/tank-effects.service';
import { UserEffectsService } from './store/user/user-effects.service';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MenuComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(()=> getDatabase()),
    provideAuth(()=> getAuth()),
    EffectsModule.forRoot([TankEffectsService, UserEffectsService])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
