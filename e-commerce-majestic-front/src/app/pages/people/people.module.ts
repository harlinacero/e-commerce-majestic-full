import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'src/app/component/alert/alert.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

const routes: Routes = [
   {
    path: '',
    component: PeopleComponent
   }
]

@NgModule({
  declarations: [
    PeopleComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    AlertComponent,
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PeopleModule { }
