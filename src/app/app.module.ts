import { AuthEffectsService } from './store/auth/auth-effects.service';
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

import { environment } from 'src/environments/environment';
import { TankEffectsService } from './store/tanks/tank-effects.service';
import { UserEffectsService } from './store/user/user-effects.service';
import { LoginComponent } from './views/account/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlatformModule } from '@angular/cdk/platform';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token-interceptors';

import { JwtModule } from '@auth0/angular-jwt';
import { appReducers } from './store/app';
import { metaReducers } from './store/logout/logout.reducer';

export function tokenGetter() {
  return localStorage.getItem('token_dp');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MenuComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PlatformModule,
    NgxMaskModule.forRoot(),
    StoreModule.forRoot(appReducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(()=> getDatabase()),
    provideAuth(()=> getAuth()),
    EffectsModule.forRoot([
      TankEffectsService, 
      UserEffectsService,
      AuthEffectsService
      ]),
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [
            'localhost:4200',
            'app.buykardex.com.br',
            'api.buykardex.com.br',
            'api-dev.buykardex.com.br',
            '192.168.1.12:4200',
            '192.168.15.119:8080',
          ],
          disallowedRoutes: [
          ]
        }
      }),
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
