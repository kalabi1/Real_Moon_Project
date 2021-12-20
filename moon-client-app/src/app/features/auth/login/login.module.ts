import { StractureModule } from './../../structure/stracture.module';
/* angular stuff */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* 3rd party libraries */

/* our own stuff */
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CoreModule } from '../../../core/core.module';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    StractureModule,
    HttpClientModule,
    CoreModule
  ]
})
export class LoginModule { }
