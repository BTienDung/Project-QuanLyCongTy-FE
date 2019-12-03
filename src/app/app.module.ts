import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {AppRoutingModule} from './app-routing.module';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardServiceService} from './auth/auth-guard-service.service';
import {AuthGuard1ServiceService} from './auth/auth-guard1-service.service';
import {UserServiceService} from './user/user-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TrangchuModule} from './trangchu/trangchu.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    TrangchuModule,
    NgxPaginationModule

  ],
  providers: [httpInterceptorProviders, AuthGuardServiceService, AuthGuard1ServiceService, UserServiceService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
