import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.component').then(m => m.HomeModule),
        data: { roles: ['admin', 'seller', 'shooper'] }
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { roles: ['admin'] }
      },  
      {
        path: 'products',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
        data: { roles: ['admin', 'seller'] }
      },
      {
        path: 'people',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/people/people.module').then(m => m.PeopleModule),
        data: { roles: ['admin'] }
      },  
      {
        path: 'shoppingcart',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/shoppingcart/shoppingcart.module').then(m => m.ShoppingcartModule),
        data: { roles: ['admin', 'seller', 'shooper'] }
      },  
      {
        path: 'about',
        canActivate: [AuthGuard],
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }