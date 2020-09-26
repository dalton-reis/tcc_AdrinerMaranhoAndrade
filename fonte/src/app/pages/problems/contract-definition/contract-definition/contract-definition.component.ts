import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { FieldContract, MethodContract, ClassContract } from '../../../../models/problem/problem-contract';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contract-definition',
  templateUrl: './contract-definition.component.html',
  styleUrls: ['./contract-definition.component.scss'],
})
export class ContractDefinitionComponent implements OnInit {

  @Input() fields: FieldContract[];
  @Input() methods: MethodContract[];

  @ViewChild('fieldsContractTable') fieldsContractTable: Ng2SmartTableComponent;
  @ViewChild('methodsContractTable') methodsContractTable: Ng2SmartTableComponent;

  contractDefinitionForm: FormGroup;
  tableErrors = {
    methods: {} as { [key: string]: boolean },
    fields: {} as { [key: string]: boolean },
  };

  fieldsSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      name: {
        title: 'Nome',
        type: 'string',
        filter: false,
      },
      description: {
        title: 'Descrição (?)',
        type: 'string',
        filter: false,
      },
    },
    noDataMessage: 'Nenhum campo configurado',
    actions: {
      columnTitle: '',
      position: 'right',
    },
  };

  methodsSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      name: {
        title: 'Nome',
        type: 'string',
        filter: false,
      },
      parameters: {
        title: 'Parâmetros (?)',
        type: 'string',
        filter: false,
      },
      description: {
        title: 'Descrição (?)',
        type: 'string',
        filter: false,
      },
    },
    actions: {
      columnTitle: '',
      position: 'right',
    },
    noDataMessage: 'Nenhum método configurado',
  };

  constructor(
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.contractDefinitionForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  validateField(event) {
    const { name } = event.newData;
    if (!name)  {
      event.confirm.reject();
      this.warnValidationError('Atenção', 'O nome do campo é obrigatório.');
    } else {
      event.confirm.resolve();
    }
  }

  validateMethod(event) {
    const { name } = event.newData;
    if (!name)  {
      event.confirm.reject();
      this.warnValidationError('Atenção', 'O nome do método é obrigatório.');
    } else {
      event.confirm.resolve();
      this.tableErrors.methods.required = false;
    }
  }

  getData(): Promise<ClassContract> {
    if (this.contractDefinitionForm.valid) {
      return Promise.all([this.fieldsContractTable.source.getAll(), this.methodsContractTable.source.getAll()])
        .then(([ fields, methods ]) => {
          if (methods.length === 0) {
            this.tableErrors.methods.required = true;
            throw Error('Form is invalid');
          }
          this.tableErrors = {
            methods: {},
            fields: {},
          };
          return { name: this.name.value, fields, methods };
        });
    }
    Object.values(this.contractDefinitionForm.controls).forEach(control => control.markAsDirty());
    return Promise.reject(new Error('Form is invalid'));
  }

  private warnValidationError(title: string, message: string) {
    const type: NbComponentStatus = 'warning';
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    this.toastrService.show(message, title, config);
  }

  get name() {
    return this.contractDefinitionForm.get('name');
  }

}
