import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BossComponent } from './boss/boss.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [BossComponent],
  exports: [
    BossComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TrangchuModule { }
