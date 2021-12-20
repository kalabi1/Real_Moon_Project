import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../core/guards/auth.guard';
import { rl1003Component } from './components/module/rl1003/rl1003.component';
import { RL1001Component } from './components/module/rl1001/rl1001.component';
import { RL1002Component } from './components/module/rl1002/rl1002.component';
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
import { Rl1016Component } from './components/module/rl1016/rl1016.component';
import { Rl1010Component } from './components/module/rl1010/rl1010.component';
import { Rl1004Component } from './components/module/rl1004/rl1004.component';
import { Rl1007Component } from './components/module/rl1007/rl1007.component';
import { Rl1015Component } from './components/module/rl1015/rl1015.component';
import { Rl1006Component } from './components/module/rl1006/rl1006.component';
import { Rl1005Component } from './components/module/rl1005/rl1005.component';
import { RL1013Component } from './components/module/rl1013/rl1013.component';
import { RL1017Component } from './components/module/rl1017/rl1017.component';
import { RL1012Component } from './components/module/rl1012/rl1012.component';
import { SA1004Component } from "./components/module/sa1004/sa1004.component";
import { AC1001Component } from "./components/module/ac1001/ac1001.component";
import { AC1003Component } from "./components/module/ac1003/ac1003.component";
import { AC1004Component } from "./components/module/ac1004/ac1004.component";
import { AC1006Component } from "./components/module/ac1006/ac1006.component";
import { AC1007Component } from "./components/module/ac1007/ac1007.component";
import { AC1008Component } from "./components/module/ac1008/ac1008.component";
import { AC1009Component } from "./components/module/ac1009/ac1009.component";
import { AC1010Component } from "./components/module/ac1010/ac1010.component";
import { AC1011Component } from "./components/module/ac1011/ac1011.component";
import { AC1015Component } from "./components/module/ac1015/ac1015.component";
import { AC1016Component } from "./components/module/ac1016/ac1016.component";
const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: 'ac1001', canActivate: [AuthGuard], component: AC1001Component },
      { path: 'ac1003', canActivate: [AuthGuard], component: AC1003Component },
      { path: 'ac1004', canActivate: [AuthGuard], component: AC1004Component },
      { path: 'ac1006', canActivate: [AuthGuard], component: AC1006Component },
      { path: 'ac1007', canActivate: [AuthGuard], component: AC1007Component },
      { path: 'ac1008', canActivate: [AuthGuard], component: AC1008Component },
      { path: 'ac1009', canActivate: [AuthGuard], component: AC1009Component },
      { path: 'ac1010', canActivate: [AuthGuard], component: AC1010Component },
      { path: 'ac1011', canActivate: [AuthGuard], component: AC1011Component },
      { path: 'ac1015', canActivate: [AuthGuard], component: AC1015Component },
      { path: 'ac1016', canActivate: [AuthGuard], component: AC1016Component },
      { path: '', canActivate: [AuthGuard], component: rl1003Component },
      { path: 'rl1003', canActivate: [AuthGuard], component: rl1003Component },
      { path: 'rl1003/:id', canActivate: [AuthGuard], component: rl1003Component },
      { path: 'rl1009', canActivate: [AuthGuard], component: RL1009Component },
      { path: 'rl1012', canActivate: [AuthGuard], component: RL1012Component },
      { path: 'rl1012/:id', canActivate: [AuthGuard], component: RL1012Component },
      { path: 'rl1017', canActivate: [AuthGuard], component: RL1017Component },
      { path: 'rl1013/:id', canActivate: [AuthGuard], component: RL1013Component },
      { path: 'rl1005', canActivate: [AuthGuard], component: Rl1005Component },
      { path: 'rl1006', canActivate: [AuthGuard], component: Rl1006Component },
      { path: 'rl1005/:id', canActivate: [AuthGuard], component: Rl1005Component },
      { path: 'rl1015/:id', canActivate: [AuthGuard], component: Rl1015Component },
      { path: 'rl1007', canActivate: [AuthGuard], component: Rl1007Component },
      { path: 'rl1007/:id', canActivate: [AuthGuard], component: Rl1007Component },
      { path: 'rl1004', canActivate: [AuthGuard], component: Rl1004Component },
      { path: 'rl1004/:id', canActivate: [AuthGuard], component: Rl1004Component },
      { path: 'rl1010', canActivate: [AuthGuard], component: Rl1010Component },
      { path: 'rl1016/:id', canActivate: [AuthGuard], component: Rl1016Component },
      { path: 'rl1001', canActivate: [AuthGuard], component: RL1001Component },
      { path: 'rl1001/:id', canActivate: [AuthGuard], component: RL1001Component },
      { path: 'rl1002', canActivate: [AuthGuard], component: RL1002Component },
      { path: 'rl1002/:id', canActivate: [AuthGuard], component: RL1002Component },
      { path: 'rl1008', canActivate: [AuthGuard], component: RL1008Component },
      { path: 'rl1011', canActivate: [AuthGuard], component: RL1011Component },
      { path: 'rl1018', canActivate: [AuthGuard], component: RL1018Component },
      { path: 'rl1019', canActivate: [AuthGuard], component: RL1019Component },
      { path: 'rl1019/:id', canActivate: [AuthGuard], component: RL1019Component },
      { path: 'rl1021', canActivate: [AuthGuard], component: RL1021Component },
      { path: 'rl1020', canActivate: [AuthGuard], component: RL1020Component },
      { path: 'sa1001', canActivate: [AuthGuard], component: SA1001Component },
      { path: 'sa1004', canActivate: [AuthGuard], component: SA1004Component },
      { path: 'sa1009', canActivate: [AuthGuard], component: SA1009Component },
      { path: 'sa1010', canActivate: [AuthGuard], component: SA1010Component },
      { path: 'sa1011', canActivate: [AuthGuard], component: SA1011Component }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }