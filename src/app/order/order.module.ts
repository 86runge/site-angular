import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OrderComponent} from './order.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderOperateComponent} from './order-operate/order-operate.component';
import {RouterModule} from '@angular/router';
import {orderRouterConfig} from './order.routes';
import {SharedModule} from '../shared/shared.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(orderRouterConfig),

        SharedModule,

        /*导入NgZorro模块*/
        NgZorroAntdModule
    ],
    declarations: [OrderComponent, OrderListComponent, OrderOperateComponent]
})
export class OrderModule {
}
