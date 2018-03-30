import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './main/main.component';
import {RestockComponent} from './restock/restock.component';
import {SalesComponent} from './sales/sales.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'sales',      component: SalesComponent },
  { path: 'restock',      component: RestockComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
