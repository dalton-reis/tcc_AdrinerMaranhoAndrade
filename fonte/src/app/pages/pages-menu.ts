import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Novo problema',
    icon: 'plus-circle-outline',
    link: '/pages/problems/problem-definition',
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
];
