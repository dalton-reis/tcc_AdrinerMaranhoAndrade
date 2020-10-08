import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemsRoutingModule } from './problems-routing.module';
import { LoginModule } from '../../auth/login.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProblemsRoutingModule,
    LoginModule,
  ],
})
export class ProblemsModule { }
