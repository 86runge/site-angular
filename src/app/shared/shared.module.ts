import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './component/header/header.component';
import {AsideMenuComponent} from './component/aside-menu/aside-menu.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {sharedRouterConfig} from './shared.routes';
import {EchartsComponent} from './component/echarts/echarts.component';
import {ZorroTreeComponent} from './component/zorro-tree/zorro-tree.component';
import {ZtreeTreeComponent} from './component/ztree-tree/ztree-tree.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(sharedRouterConfig),

        /*导入NgZorro模块*/
        NgZorroAntdModule
    ],
    declarations: [
        HeaderComponent,
        AsideMenuComponent,
        EchartsComponent,
        ZorroTreeComponent,
        ZtreeTreeComponent
    ],
    exports: [
        HeaderComponent,
        AsideMenuComponent,
        EchartsComponent,
        ZorroTreeComponent,
        ZtreeTreeComponent
    ]
})
export class SharedModule {
}
