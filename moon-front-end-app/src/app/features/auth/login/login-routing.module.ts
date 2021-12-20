/* angular stuff */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 3rd party libraries */

/* our own stuff */
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
