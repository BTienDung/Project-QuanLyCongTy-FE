import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuardServiceService} from './auth/auth-guard-service.service';
import {AuthGuard1ServiceService} from './auth/auth-guard1-service.service';
import {UserComponent} from './user/user.component';
import {BossComponent} from './trangchu/boss/boss.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/:username',
    component: UserComponent,
    canActivate: [AuthGuard1ServiceService]

  },
  {
    path: 'signup',
    component: RegisterComponent,
    canActivate: [AuthGuardServiceService]
  },
  {
    path: '',
    redirectTo: 'trangchu',
    pathMatch: 'full'
  },
  {
    path: 'trangchu',
    component: BossComponent
  },
  {
    path: 'company', loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: 'technology', loadChildren: './technology/technology.module#TechnologyModule'
  },
  {
    path: 'tags', loadChildren: './tags/tags.module#TagsModule'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
