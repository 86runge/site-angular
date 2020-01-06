import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {RouterModule} from '@angular/router';
import {homePageRouterConfig} from './home-page.routes';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(homePageRouterConfig),

        /*导入公共模块*/
        SharedModule,

        /*导入NgZorro模块*/
        NgZorroAntdModule
    ],
    declarations: [HomePageComponent]
})
export class HomePageModule {
}
