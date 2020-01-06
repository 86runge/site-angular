import {Routes} from '@angular/router';
import {GoodComponent} from './good.component';
import {GoodListComponent} from './good-list/good-list.component';
import {GoodOperateComponent} from './good-operate/good-operate.component';

export const goodRouterConfig: Routes = [
    {
        path: 'good',
        component: GoodComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'good-list'
            }, {
                path: 'good-list',
                component: GoodListComponent,
            }, {
                path: 'good-operate',
                component: GoodOperateComponent
            }
        ]
    }
];
