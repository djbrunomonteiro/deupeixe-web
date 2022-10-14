import { EditorComponent } from './editor/editor.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tanks',
        component: ListComponent,
      },
      {
        path: 'tanks/edit',
        component: EditorComponent,
      },
      {
        path: 'tanks/edit/:id',
        component: EditorComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TanksRoutingModule { }
