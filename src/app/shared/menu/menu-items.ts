import { IRouteInfo } from "src/app/models/i-route-info";

export const MENUROUTES: IRouteInfo[] = [
  {
    path: 'dashboard',
    permissions: [],
    title: 'Resumo',
    icon: 'home',
    class: '',
    submenu: []
  },
  {
    path: 'tanks',
    permissions: [],
    title: 'Meus Viveiros',
    icon: 'panorama_wide_angle',
    class: '',
    submenu: [
      {
        path: 'tanks/edit',
        permissions: [],
        title: 'Criar Viveiro',
        icon: 'panorama_wide_angle',
        class: '',
        submenu: []
      },
    ]
  },
  {
    path: 'tanks',
    permissions: [],
    title: 'Meus Relatórios',
    icon: 'equalizer',
    class: '',
    submenu: []
  },
  {
    path: 'tanks',
    permissions: [],
    title: 'Notícias',
    icon: ' list_alt',
    class: '',
    submenu: []
  },
  {
    path: 'tanks',
    permissions: [],
    title: 'Central de Notificações',
    icon: 'sms',
    class: '',
    submenu: []
  },
  {
    path: 'tanks',
    permissions: [],
    title: 'Soluções Tecnológicas ',
    icon: 'ondemand_video',
    class: '',
    submenu: []
  },
  {
    path: 'tanks',
    permissions: [],
    title: 'Configurações',
    icon: 'settings',
    class: '',
    submenu: []
  },
  {
    path: 'tanks',
    permissions: [],
    title: 'Ajuda',
    icon: 'help',
    class: '',
    submenu: []
  }
]
