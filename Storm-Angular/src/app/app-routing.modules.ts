import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { AnnouncementsComponent } from "./auth/announcements/announcements.component";
import { AnnouncementDetailsComponent } from "./auth/announcement-details/announcement-details.component";

const routes: Routes = [
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "user", loadChildren: () => import("./module/user.module").then(m => m.UserModule) },
    { path: "announcements", component: AnnouncementsComponent},
    { path: '', redirectTo: 'announcements', pathMatch: 'full' },
    { path: "announcements/:id", component: AnnouncementDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
