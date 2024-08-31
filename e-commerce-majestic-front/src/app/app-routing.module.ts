import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './helpers/auth.guard';
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
        canActivate: [authGuard],
        loadChildren: () => import('./home/home.component').then(m => m.HomeModule)
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },  
      {
        path: 'products',
        canActivate: [authGuard],
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'people',
        canActivate: [authGuard],
        loadChildren: () => import('./pages/people/people.module').then(m => m.PeopleModule)
      },  
      {
        path: 'about',
        canActivate: [authGuard],
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        canActivate: [authGuard],
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
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