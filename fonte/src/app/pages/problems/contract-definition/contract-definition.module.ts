import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDefinitionComponent } from './contract-definition/contract-definition.component';
import { FormsModule as ngFormsModule , ReactiveFormsModule as ngReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../../shared/shared.module';
import { NbToastrModule } from '@nebular/theme';

@NgModule({
  declarations: [
    ContractDefinitionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ngFormsModule,
    ngReactiveFormsModule,
    NbToastrModule,
    Ng2SmartTableModule,
  ],
  exports: [
    ContractDefinitionComponent,
  ],
})
export class ContractDefinitionModule { }
