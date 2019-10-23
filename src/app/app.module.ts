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

import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import {DoctorsService} from './admin/doctors.service';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AddComponent,
    DoctorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [MessageService, HttpErrorHandler, DoctorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }