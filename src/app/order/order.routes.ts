import {Routes} from '@angular/router';
import {OrderComponent} from './order.component';
import {AuthorityGuardService} from '../shared/service/authority-guard/authority-guard.service';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderOperateComponent} from './order-operate/order-operate.component';

export const orderRouterConfig: Routes = [
    {
        path: 'order',
        component: OrderComponent,
        canActivate: [AuthorityGuardService],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'order-list'
            }, {
                path: 'order-list',
                component: OrderListComponent
            }, {
                path: 'order-operate',
                component: OrderOperateComponent
            }
        ]
    }
];
