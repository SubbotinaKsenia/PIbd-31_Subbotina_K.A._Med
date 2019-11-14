import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './header/app.component';
import { RecordComponent } from './record/record.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './admin/add/add.component';
import { DoctorsComponent } from './doctors/doctors.component'
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import {DoctorsService} from './admin/doctors.service';
import { UserService } from './user.service';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CookieService } from 'ngx-cookie-service'
import { isAuthorized } from './isAuthorized';
import { authService } from './authService';
import { WebhookComponent } from './webhook/webhook.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AddComponent,
    DoctorsComponent,
    LoginComponent,
    RegistrationComponent,
    RecordComponent,
    WebhookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [MessageService, HttpErrorHandler, DoctorsService, UserService, CookieService, isAuthorized, authService],
  bootstrap: [AppComponent]
})
export class AppModule { }