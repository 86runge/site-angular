import {Component, OnInit} from '@angular/core';
import {NzTreeNode} from 'ng-zorro-antd';
import {TreeExampleService} from '../tree-example.service';

@Component({
    selector: 'mysite-zorro-tree-demo',
    templateUrl: './zorro-tree-demo.component.html',
    styleUrls: ['./zorro-tree-demo.component.scss'],
    providers: [TreeExampleService]
})
export class ZorroTreeDemoComponent implements OnInit {

    public nodes: Array<NzTreeNode>;
    public nzExpandedKeys: Array<string>;
    public nzCheckedKeys: Array<string>;
    public nzSelectedKeys: Array<string>;
    public nzSearchValue: string;

    public nzExpandAll: boolean;
    public nzCheckable: boolean;
    public nzMultiple: boolean;
    public nzCheckStrictly: boolean;
    public nzShowExpand: boolean;
    public nzShowLine: boolean;
    public nzShowIcon: boolean;
    public nzAsyncData: boolean;
    public nzDraggable: boolean;
    public nzBeforeDrop: boolean;


    constructor(private $treeExampleSrc: TreeExampleService) {
    }

    ngOnInit() {

        this.nzCheckable = true;
        this.nzMultiple = true;
        this.nzShowExpand = true;
        this.nzShowIcon = true;
        this.nzShowLine = true;
        this.nzAsyncData = true;

        this.nodes = this.$treeExampleSrc.getTreeData();

    }


    public clickEvent(value: any): void {
        console.log(value);
    };

    public dbClickEvent(value: any): void {
    };

    public contextMenuEvent(value: any): void {
    };

    public checkBoxChangeEvent(value: any): void {
        console.log(value);
    };

    public expandChangeEvent(value: any): void {
    };

    public searchValueChangeEvent(value: any): void {
        console.log(value);
    };

    public dragStartEvent(value: any): void {
    };

    public dragEnterEvent(value: any): void {
    };

    public dragOverEvent(value: any): void {
    };

    public dragLeaveEvent(value: any): void {
    };

    public dropEvent(value: any): void {
    };

    public dragEndEvent(value: any): void {
    };

}
