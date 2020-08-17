import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeExecutionComponent } from './code-execution/code-execution.component';


const routes: Routes = [{
  path: '',
  component: CodeExecutionComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeExecutionRoutingModule { }
