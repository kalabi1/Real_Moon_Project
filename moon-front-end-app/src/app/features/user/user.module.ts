
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { StractureModule } from '../structure/stracture.module';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreModule } from '../../core/core.module';
import { TokenInterceptor } from '../../core/interceptors/token-interceptor.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { rl1003Component } from './components/module/rl1003/rl1003.component';
import { RL1012Component } from './components/module/rl1012/rl1012.component';
import { RL1017Component } from './components/module/rl1017/rl1017.component';
import { RL1013Component } from './components/module/rl1013/rl1013.component';
import { Rl1005Component } from './components/module/rl1005/rl1005.component';
import { Rl1006Component } from './components/module/rl1006/rl1006.component';
import { Rl1015Component } from './components/module/rl1015/rl1015.component';
import { Rl1007Component } from './components/module/rl1007/rl1007.component';
import { Rl1004Component } from './components/module/rl1004/rl1004.component';
import { Rl1010Component } from './components/module/rl1010/rl1010.component';
import { Rl1016Component } from './components/module/rl1016/rl1016.component';
import { RL1002Component } from './components/module/rl1002/rl1002.component';
import { RL1001Component } from './components/module/rl1001/rl1001.component';
import { RL1009Component } from './components/module/rl1009/rl1009.component';
import { RL1008Component } from './components/module/rl1008/rl1008.component';
import { RL1011Component } from './components/module/rl1011/rl1011.component';
import { RL1018Component } from './components/module/rl1018/rl1018.component';
import { SA1001Component } from './components/module/sa1001/sa1001.component';
import { RL1019Component } from './components/module/rl1019/rl1019.component';
import { RL1020Component } from './components/module/rl1020/rl1020.component';
import { RL1021Component } from './components/module/rl1021/rl1021.component';
import { SA1009Component } from './components/module/sa1009/sa1009.component';
import { SA1010Component } from './components/module/sa1010/sa1010.component';
import { SA1011Component } from './components/module/sa1011/sa1011.component';
import { FilterPipe } from '../../core/pipe/filter.pipe';
import { NgSelectModule } from "@ng-select/ng-select";
import { SA1004Component } from './components/module/sa1004/sa1004.component';
import { SA1003Component } from './components/module/sa1003/sa1003.component';
import { SA1005Component } from './components/module/sa1005/sa1005.component';
import { SA1006Component } from './components/module/sa1006/sa1006.component';
import { SA1007Component } from './components/module/sa1007/sa1007.component';
import { AC1001Component } from './components/module/ac1001/ac1001.component';
import { AC1003Component } from './components/module/ac1003/ac1003.component';
import { AC1004Component } from './components/module/ac1004/ac1004.component';
import { AC1006Component } from './components/module/ac1006/ac1006.component';
import { AC1016Component } from './components/module/ac1016/ac1016.component';
import { AC1007Component } from './components/module/ac1007/ac1007.component';
import { AC1015Component } from './components/module/ac1015/ac1015.component';
import { AC1008Component } from './components/module/ac1008/ac1008.component';
import { AC1009Component } from './components/module/ac1009/ac1009.component';
import { AC1010Component } from './components/module/ac1010/ac1010.component';
import {  AC1011Component } from './components/module/ac1011/ac1011.component';
@NgModule({
  imports:[
    CommonModule,
    StractureModule,
    UserRoutingModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgxYoutubePlayerModule.forRoot(),
    CarouselModule.forRoot(),
    NgxPaginationModule,
    CoreModule
  ],
  declarations: [
    UserComponent, 
    rl1003Component,
    RL1012Component,
    RL1017Component,
    RL1013Component,
    Rl1005Component,
    Rl1006Component,
    Rl1015Component,
    Rl1007Component,
    Rl1004Component,
    Rl1010Component,
    Rl1016Component,
    RL1002Component,
    RL1001Component,
    RL1009Component,
    RL1008Component,
    RL1011Component,
    RL1018Component,
    SA1001Component,
    RL1019Component,
    RL1020Component,
    RL1021Component,
    FilterPipe,
    SA1009Component,
    SA1010Component,
    SA1011Component,
    SA1004Component,
    SA1003Component,
    SA1005Component,
    SA1006Component,
    SA1007Component,
    AC1001Component,
    AC1003Component,
    AC1004Component,
    AC1006Component,
    AC1016Component,
    AC1007Component,
    AC1015Component,
    AC1008Component,
    AC1009Component,
    AC1010Component,
    AC1011Component
  ],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class UserModule { }