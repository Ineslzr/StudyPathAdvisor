import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  { path: '', component: StatistiquesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
