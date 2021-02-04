import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'problem-definition',
  loadChildren: () => import('./problem-definition/problem-definition.module')
        .then(m => m.ProblemDefinitionModule),
}, {
  path: 'problem-edit',
  loadChildren: () => import('./problem-edit/problem-edit.module')
        .then(m => m.ProblemEditModule),
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ProblemsRoutingModule { }
