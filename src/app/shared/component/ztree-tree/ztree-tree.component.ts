import {Component, Input, OnInit} from '@angular/core';
import * as uuid from 'uuid';
import * as zTree from 'ztree';
import * as JQ from 'jquery';
import {ZtreeTreeNode} from './ztree-tree.node';

@Component({
    selector: 'mysite-ztree-tree',
    templateUrl: './ztree-tree.component.html',
    styleUrls: ['./ztree-tree.component.scss']
})
export class ZtreeTreeComponent implements OnInit {

    public zTreeNodes: Array<ZtreeTreeNode>;
    @Input() set nodes(value: ZtreeTreeNode[]) {
        this.zTreeNodes = value;
        this.rendererTree();
    }

    public ztreeId: string;
    public ztreeObj: any;

    constructor() {
    }

    ngOnInit() {
        this.ztreeId = 'ztree' + uuid();
        if (this.ztreeObj) {
            this.ztreeObj.destory();
        }
    }

    public rendererTree() {
        this.ztreeObj = zTree.fn.zTree.init(JQ(`#${this.ztreeId}`), this.getSettings(), this.zTreeNodes);
    }

    public getSettings(): any {
        return {
            view: {
                selectedMulti: false
            }
        };
    }

}
