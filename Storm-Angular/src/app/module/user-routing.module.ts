import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from './user-components/create-item/create-item.component';
import { DashboardComponent } from './user-components/dashboard/dashboard.component';
import { MyDashboardComponent } from './user-components/my-dashboard/my-dashboard.component';
import { FavoritesComponent } from './user-components/favorites/favorites.component';
import { EditItemComponent } from './user-components/edit-item/edit-item.component';

const routes: Routes = [
  { path: "create-item", component: CreateItemComponent },
  { path: "announcements", component: DashboardComponent },
  { path: "announcements:userId", component: MyDashboardComponent},
  { path: "favorites:userId", component: FavoritesComponent},
  { path: "announcement/edit/:announcementId", component: EditItemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
