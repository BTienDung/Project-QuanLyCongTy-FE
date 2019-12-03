import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardServiceService} from '../auth/auth-guard-service.service';
import {ReactiveFormsModule} from '@angular/forms';

const route: Routes = [
  {path: 'list', component: ListComponent, canActivate: [AuthGuardServiceService]},
  {path: 'add', component: AddComponent, canActivate: [AuthGuardServiceService]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuardServiceService]},
  {path: 'view/:id', component: ViewComponent, canActivate: [AuthGuardServiceService]},
];

@NgModule({
  declarations: [ListComponent, AddComponent, ViewComponent, EditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule
  ]
})
export class TechnologyModule { }
