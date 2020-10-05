import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'PROBLEMAS',
    group: true,
  },
  {
    title: 'Novo problema',
    icon: 'plus-circle-outline',
    link: '/pages/problems/problem-definition',
  },
  {
    title: 'Executar',
    icon: 'code',
    link: '/pages/code-execution',
  },
];
