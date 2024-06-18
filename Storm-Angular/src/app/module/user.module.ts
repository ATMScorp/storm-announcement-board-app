import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CreateItemComponent } from './user-components/create-item/create-item.component';
import { DashboardComponent } from './user-components/dashboard/dashboard.component';
import { MyDashboardComponent } from './user-components/my-dashboard/my-dashboard.component';
import { FavoritesComponent } from './user-components/favorites/favorites.component';
import { EditItemComponent } from './user-components/edit-item/edit-item.component';

@NgModule({
  declarations: [
    CreateItemComponent,
    DashboardComponent,
    MyDashboardComponent,
    FavoritesComponent,
    EditItemComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    RouterModule
  ]
})
export class UserModule { }
