

import { NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { AlertComponent } from './../core/popup/alert.component';
import { TokenInterceptor } from '../core/interceptors/token-interceptor.service';
import { SpinnerService } from '../core/services/spinner.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AlertComponent,
  ],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  exports: [
    AlertComponent,
  ],
})
export class CoreModule { }