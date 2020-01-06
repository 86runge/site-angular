import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeExampleComponent} from './tree-example.component';
import {ZorroTreeDemoComponent} from './zorro-tree-demo/zorro-tree-demo.component';
import {ZtreeTreeDemoComponent} from './ztree-tree-demo/ztree-tree-demo.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {treeExampleRouterConfig} from './tree-example.router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(treeExampleRouterConfig),

        SharedModule,

        /*导入NgZorro模块*/
        NgZorroAntdModule
    ],
    declarations: [TreeExampleComponent, ZorroTreeDemoComponent, ZtreeTreeDemoComponent]
})
export class TreeExampleModule {
}
