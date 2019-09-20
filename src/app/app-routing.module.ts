import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './Components/Header/app.component';
import { RecordComponent } from './Components/record/record.component';
import { HomeComponent } from './Components/home/home.component';

const appRoutes: Routes = [
  { path: 'record', component: RecordComponent },
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
