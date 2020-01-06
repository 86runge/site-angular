import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemberComponent} from './member.component';
import {MyInfoComponent} from './my-info/my-info.component';
import {HistoryRecordComponent} from './history-record/history-record.component';
import {RouterModule} from '@angular/router';
import {memberRouterConfig} from './member.routes';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(memberRouterConfig),

        SharedModule,

        /*导入NgZorro模块*/
        NgZorroAntdModule
    ],
    declarations: [MemberComponent, MyInfoComponent, HistoryRecordComponent]
})
export class MemberModule {
}
