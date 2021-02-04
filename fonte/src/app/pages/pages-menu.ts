import { NbMenuItem } from '@nebular/theme';
import { DocumentationService } from '../documentation/documentation.service';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Problemas',
    group: true,
  },
  {
    title: 'Novo problema',
    icon: 'plus-circle-outline',
    link: '/pages/problems/problem-definition',
  },
  {
    title: 'Editar problema',
    icon: 'edit-2-outline',
    link: '/pages/problems/problem-edit',
  },
  {
    title: 'Executar problema',
    icon: 'code',
    children: [{
      icon: 'list-outline',
      title: 'Selecionar',
      link: '/pages/code-execution',
    }, {
      icon: 'play-circle-outline',
      title: 'Executar',
      link: '/pages/code-execution/execute',
    }],
  },
  {
    title: 'Auxiliares',
    group: true,
  },
  {
    title: 'Ajuda',
    icon: 'question-mark-circle-outline',
    url: new DocumentationService().home,
    target: '_blank',
    skipLocationChange: true,
  },
];
