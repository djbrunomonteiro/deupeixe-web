import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EditorComponent } from './editor/editor.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TanksRoutingModule } from './tanks-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MAT_DATE_LOCALE} from '@angular/material/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MaterialsharedModule } from 'src/app/modules/materialshared/materialshared.module';


@NgModule({
  declarations: [
    ListComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TanksRoutingModule,
    NgxMaskModule,
    StoreModule,
    MaterialsharedModule
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'pt-Br'},
  ]
})
export class TanksModule { }
