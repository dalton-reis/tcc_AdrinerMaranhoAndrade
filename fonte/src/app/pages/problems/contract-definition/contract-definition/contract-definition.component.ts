import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { FieldContract, MethodContract, ClassContract } from '../../../../models/problem/problem-contract';
import { Ng2SmartTableComponent } from 'ng2-smart-table';

@Component({
  selector: 'app-contract-definition',
  templateUrl: './contract-definition.component.html',
  styleUrls: ['./contract-definition.component.scss'],
})
export class ContractDefinitionComponent implements OnInit {

  constructor(private toastrService: NbToastrService) { }

  @Input() fields: FieldContract[];
  @Input() methods: MethodContract[];

  @ViewChild('fieldsContractTable') fieldsContractTable: Ng2SmartTableComponent;
  @ViewChild('methodsContractTable') methodsContractTable: Ng2SmartTableComponent;

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
    }
  }

  getData(): Promise<ClassContract> {
    return Promise.all([this.fieldsContractTable.source.getAll(), this.methodsContractTable.source.getAll()])
      .then(([ fields, methods ]) => ({ fields, methods }),
    );
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

}
