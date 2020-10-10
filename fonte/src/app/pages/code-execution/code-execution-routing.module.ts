import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemsListComponent } from './problems-list/problems-list.component';
import { ProblemExecutionComponent } from './problem-execution/problem-execution.component';

const routes: Routes = [{
  path: '',
  component: ProblemsListComponent,
}, {
  path: 'execute',
  component: ProblemExecutionComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeExecutionRoutingModule { }
