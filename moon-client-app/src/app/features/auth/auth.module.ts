/* angular stuff */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* 3rd party libraries */

/* our own stuff */
import {routing} from "./auth.routing";
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [ AuthComponent, LogoutComponent]
})
export class AuthModule { }
