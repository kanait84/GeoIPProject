import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {GeoipComponent} from "../geoip/geoip.component";
const routes: Routes = [
  {path: '' , redirectTo: '/geoip' , pathMatch: 'full'},
  {path: 'geoip' , component: GeoipComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
