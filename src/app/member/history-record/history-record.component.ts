import {Component, OnInit} from '@angular/core';
import {Echarts, EchartsModel} from '../../shared/model/echarts.model';
import {ECHARTS_OPTIONS} from '../../shared/const/echarts.const';

@Component({
    selector: 'mysite-history-record',
    templateUrl: './history-record.component.html',
    styleUrls: ['./history-record.component.scss']
})
export class HistoryRecordComponent implements OnInit {

    // 宽高自适应
    width: number;
    height: number;

    options: EchartsModel;

    private echarts: Echarts;

    constructor() {
    }

    ngOnInit() {
        this.options = ECHARTS_OPTIONS['line'];
    }

    initComplete(echarts: Echarts) {
        this.echarts = echarts;
    }

    initOptions(type: string): void {
        this.options = ECHARTS_OPTIONS[type];
    }

}
