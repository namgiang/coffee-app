import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../services/index';
import { DepartmentsPage } from '../pages/departments/departments';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';

const routes: Routes = [
  { path: '', component: DepartmentsPage, canActivate: [AuthGuard] },
  { path: 'departments',  component: DepartmentsPage },
  { path: 'login', component: LoginPage },
  { path: 'sign-up', component: SignUpPage },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
