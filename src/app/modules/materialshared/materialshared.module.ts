import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule, 
    MatButtonModule,
    MatRadioModule,
    MatMenuModule, 
    MatSidenavModule,
    MatTabsModule,
    MatStepperModule,
    MatProgressBarModule
  ],
  exports:[
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule, 
    MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatStepperModule,
    MatProgressBarModule
  ]
})
export class MaterialsharedModule {
  static forRoot() {
    return {
        ngModule: MaterialsharedModule,
        providers: [],
    };
  }

 }
