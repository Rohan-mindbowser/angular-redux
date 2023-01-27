import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './home/home.component';
import { userReducer } from './store/reducers/user.reducers';
import { StoreModule } from '@ngrx/store';
import { UsersEffect } from './store/effects/user.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature('myusers', userReducer),
    EffectsModule.forFeature([UsersEffect]),
  ],
})
export class UsersModule {}
