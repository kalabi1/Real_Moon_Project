import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: '../app/features/user/user.module#UserModule'
    },
    {
        path: 'login',
        loadChildren: '../app/features/auth/login/login.module#LoginModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

