import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemDefinitionComponent } from './problem-definition/problem-definition.component';


const routes: Routes = [{
  path: '',
  component: ProblemDefinitionComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemDefinitionRoutingModule { }
