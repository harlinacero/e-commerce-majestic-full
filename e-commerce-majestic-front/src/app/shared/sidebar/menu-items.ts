import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/home',
    title: 'Inicio',
    icon: 'bi bi-house-door-fill',
    class: '',
    extralink: false,
    submenu: [],
    roles: ["admin", "seller", "shooper"]
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
    roles: ["admin"]
  },
  {
    path: '/component/presentation',
    title: 'Videos',
    icon: 'bi bi-play-btn-fill',
    class: '',
    extralink: false,
    submenu: [],
    roles: ["seller", "shooper"]
  },
  {
    path: '/products',
    title: 'Productos',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: [],
    roles: ["admin", "seller"]
  },
  {
    path: '/people',
    title: 'Usuarios',
    icon: 'bi bi-people-fill',
    class: '',
    extralink: false,
    submenu: [],
    roles: ["admin"]
  }
];
