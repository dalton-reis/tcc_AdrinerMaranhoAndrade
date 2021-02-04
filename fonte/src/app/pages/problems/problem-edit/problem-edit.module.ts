import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemEditComponent } from './problem-edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProblemEditRoutingModule } from './problem-edit-routing.module';
import { ProblemDefinitionModule } from '../problem-definition/problem-definition.module';
import { NbCardModule, NbAccordionModule, NbListModule } from '@nebular/theme';
import { LoginModule } from '../../../auth/login.module';
import { SelectFileModule } from '../../../commom/select-file/select-file.module';
import { ProblemItemModule } from '../../problem-item/problem-item.module';

@NgModule({
  declarations: [ProblemEditComponent],
  imports: [
    CommonModule,
    ProblemEditRoutingModule,
    ProblemDefinitionModule,
    SharedModule,
    NbCardModule,
    NbAccordionModule,
    LoginModule,
    SelectFileModule,
    NbListModule,
    ProblemItemModule,
  ],
})
export class ProblemEditModule { }
