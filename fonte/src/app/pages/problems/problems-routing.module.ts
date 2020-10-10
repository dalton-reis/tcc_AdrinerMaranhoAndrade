import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'problem-definition',
  loadChildren: () => import('./problem-definition/problem-definition.module')
        .then(m => m.ProblemDefinitionModule),
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ProblemsRoutingModule { }
