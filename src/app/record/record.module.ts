import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordComponent } from './record.component';

export const ROUTES: Routes = [
    { path: '', component: RecordComponent, pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    declarations: [RecordComponent]
})
export class RecordModule { }