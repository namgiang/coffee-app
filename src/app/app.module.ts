import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';

// used to create fake backend
import { fakeBackendProvider } from '../services/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AuthGuard, AuthenticationService, UserService, EmitterService, DepartmentService, FlavorService, UserFlavorService } from '../services/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from '../pages/login/login';
import { DepartmentsPage } from '../pages/departments/departments';
import { FlavorsPage } from '../pages/flavors/flavors';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AlertComponent } from '../components/alert/alert';
import { NewDepartmentDialog } from '../components/new-department-dialog/new-department-dialog';
import { ConfirmDialog } from '../components/confirm-dialog/confirm-dialog';
import { FlavorDialog } from '../components/flavor-dialog/flavor-dialog';
import { StarRating } from '../components/star-rating/star-rating';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsPage,
    LoginPage,
    SignUpPage,
    FlavorsPage,
    AlertComponent,
    NewDepartmentDialog,
    ConfirmDialog,
    FlavorDialog,
    StarRating
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    NewDepartmentDialog,
    AlertComponent,
    ConfirmDialog,
    FlavorDialog,
    StarRating
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    EmitterService,
    DepartmentService,
    FlavorService,
    UserFlavorService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
