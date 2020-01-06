import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './user.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {userRouterConfig} from './user.routes';
import {NgZorroAntdModule, NZ_I18N, zh_CN as NZ_CN} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRouterConfig),

        /*导入NgZorro模块*/
        NgZorroAntdModule
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: NZ_CN
        },
    ],
    declarations: [UserComponent, LoginComponent]
})
export class UserModule {
}
