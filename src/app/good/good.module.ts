import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GoodComponent} from './good.component';
import {GoodListComponent} from './good-list/good-list.component';
import {GoodOperateComponent} from './good-operate/good-operate.component';
import {RouterModule} from '@angular/router';
import {goodRouterConfig} from './good.routes';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(goodRouterConfig),

        SharedModule,

        /*导入NgZorro模块*/
        NgZorroAntdModule
    ],
    declarations: [GoodComponent, GoodListComponent, GoodOperateComponent]
})
export class GoodModule {
}
