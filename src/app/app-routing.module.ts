import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './header/app.component';
import { RecordComponent } from './record/record.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './admin/add/add.component';
import { DoctorsComponent } from './doctors/doctors.component'

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/edit/:id', component: AddComponent , data:{mode:"edit"}},
  { path: 'doctors', component: DoctorsComponent },  
  { path: 'record', loadChildren: './record/record.module#RecordModule' },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
