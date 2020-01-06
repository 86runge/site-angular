import {Routes} from '@angular/router';
import {TreeExampleComponent} from './tree-example.component';
import {ZorroTreeDemoComponent} from './zorro-tree-demo/zorro-tree-demo.component';
import {ZtreeTreeDemoComponent} from './ztree-tree-demo/ztree-tree-demo.component';
import {AuthorityGuardService} from '../shared/service/authority-guard/authority-guard.service';

export const treeExampleRouterConfig: Routes = [
    {
        path: 'tree-example',
        component: TreeExampleComponent,
        canActivate: [AuthorityGuardService],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'zorro-tree-demo'
            },
            {
                path: 'zorro-tree-demo',
                component: ZorroTreeDemoComponent
            },
            {
                path: 'ztree-tree-demo',
                component: ZtreeTreeDemoComponent
            }
        ]
    }
];
