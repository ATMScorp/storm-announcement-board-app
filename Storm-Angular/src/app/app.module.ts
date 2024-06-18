import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.modules';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './auth/announcements/announcements.component';
import { AnnouncementDetailsComponent } from './auth/announcement-details/announcement-details.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        AnnouncementsComponent,
        AnnouncementDetailsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }