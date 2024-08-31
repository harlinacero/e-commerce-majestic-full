import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/home',
    title: 'Inicio',
    icon: 'bi bi-house-door-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/presentation',
    title: 'Videos',
    icon: 'bi bi-play-btn-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/products',
    title: 'Productos',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/people',
    title: 'Usuarios',
    icon: 'bi bi-people-fill',
    class: '',
    extralink: false,
    submenu: []
  }
];
