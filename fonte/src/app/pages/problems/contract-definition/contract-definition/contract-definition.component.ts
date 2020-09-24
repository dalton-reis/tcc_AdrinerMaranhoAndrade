import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'app-contract-definition',
  templateUrl: './contract-definition.component.html',
  styleUrls: ['./contract-definition.component.scss'],
})
export class ContractDefinitionComponent implements OnInit {

  constructor(private toastrService: NbToastrService) { }

  @Input() source: any = [];

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
