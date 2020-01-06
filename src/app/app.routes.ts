import {Routes} from '@angular/router';

/**
 * 应用的主路由，每个子模块通过懒加载的方式启动。
 */
export const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full'
    },
    // {
    //     path: 'good',
    //     loadChildren: './good/good.model#GoodModule'
    // },
    // {
    //     path: 'order',
    //     loadChildren: './order/order.model#OrderModule'
    // },
    // {
    //     path: 'member',
    //     loadChildren: './member/member.model#MemberModule'
    // },
    // {
    //     path: 'tree-example',
    //     loadChildren: './tree-example/tree-example.model#TreeExampleModule'
    // },
];
