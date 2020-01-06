import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'mysite-good-operate',
    templateUrl: './good-operate.component.html',
    styleUrls: ['./good-operate.component.scss']
})
export class GoodOperateComponent implements OnInit {
    date = null; // new Date();

    // 下拉框
    listOfOption = [];
    listOfSelectedValue = ['a10', 'c12'];

    // 滑动条
    singleValue;
    rangeValue;

    // 垂直滑动条----温度计
    style = {
        float: 'left',
        height: '300px',
        marginLeft: '70px'
    };

    marks = {
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: {
            style: {
                color: '#f50',
            },
            label: '<strong>100°C</strong>',
        }
    };

    // 穿梭框
    list = [];

    constructor(private msg: NzMessageService) {
    }

    ngOnInit() {
        // 下拉框
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push({label: i.toString(36) + i, value: i.toString(36) + i});
        }
        this.listOfOption = children;

        // 穿梭框
        this.getData();

    }

    onChange(result): void {
        console.log('Selected Value: ', result);
    }

    getWeek(result: Date): void {
        console.log('Selected Time: ', result);
    }

    onOk(result: Date): void {
        console.log('onOk', result);
    }

    onAfterChange(value) {
        console.log(`onAfterChange: ${value}`);
    }

    /**
     * 穿梭框
     */
    getData(): void {
        const ret = [];
        for (let i = 0; i < 20; i++) {
            ret.push({
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                direction: Math.random() * 2 > 1 ? 'right' : ''
            });
        }
        this.list = ret;
    }

    reload(direction: string): void {
        this.getData();
        this.msg.success(`your clicked ${direction}!`);
    }

    select(ret: {}): void {
        console.log('nzSelectChange', ret);
    }

    change(ret: {}): void {
        console.log('nzChange', ret);
    }

}
