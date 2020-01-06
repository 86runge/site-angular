import {Routes} from '@angular/router';
import {MemberComponent} from './member.component';
import {AuthorityGuardService} from '../shared/service/authority-guard/authority-guard.service';
import {MyInfoComponent} from './my-info/my-info.component';
import {HistoryRecordComponent} from './history-record/history-record.component';

export const memberRouterConfig: Routes = [
    {
        path: 'member',
        component: MemberComponent,
        canActivate: [AuthorityGuardService],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'my-info'
            }, {
                path: 'my-info',
                component: MyInfoComponent
            }, {
                path: 'history-record',
                component: HistoryRecordComponent
            }
        ]
    }
];
