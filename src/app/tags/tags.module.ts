import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import {ListComponent} from './list/list.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardServiceService} from '../auth/auth-guard-service.service';
import {ReactiveFormsModule} from '@angular/forms';
const route: Routes = [
  {path: 'list',component: ListComponent , canActivate: [AuthGuardServiceService]},
  {path: 'add',component: AddComponent , canActivate: [AuthGuardServiceService]},
  {path: 'edit/:',component: EditComponent , canActivate: [AuthGuardServiceService]},
  {path: 'view/:id',component: ViewComponent , canActivate: [AuthGuardServiceService]},
];

@NgModule({
  declarations: [AddComponent,ListComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
  ]
})
export class TagsModule { }
