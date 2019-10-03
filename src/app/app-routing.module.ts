import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './header/app.component';
import { RecordComponent } from './record/record.component';
import { HomeComponent } from './home/home.component';

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
