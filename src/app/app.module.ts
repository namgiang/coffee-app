import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from '../services/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AlertService, AuthGuard, AuthenticationService, UserService, EmitterService } from '../services/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from '../pages/login/login';
import { DepartmentsPage } from '../pages/departments/departments';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AlertComponent } from '../components/alert/alert';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentsPage,
    LoginPage,
    SignUpPage,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AlertService,
    AuthGuard,
    AuthenticationService,
    UserService,
    EmitterService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
