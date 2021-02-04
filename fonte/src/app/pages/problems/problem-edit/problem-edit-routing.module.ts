import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemEditComponent } from './problem-edit.component';

const routes: Routes = [{
  path: '',
  component: ProblemEditComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemEditRoutingModule { }
