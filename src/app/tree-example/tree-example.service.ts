import {Injectable} from '@angular/core';
import {NzTreeNode} from 'ng-zorro-antd';

@Injectable()
export class TreeExampleService {

    public treeData: any[] = [];

    constructor() {
        /**
         * 模拟数据
         */
        for (let i = 0; i < 3; i++) {
            const childFirst = [];
            for (let j = 0; j < 3; j++) {
                const childSecond = [];
                for (let s = 0; s < 3; s++) {
                    const childThird = [];
                    for (let t = 0; t < 3; t++) {
                        const nodeFour = {id: `3_${t}`, name: `街道${t}`, children: []};
                        childThird.push(nodeFour);
                    }
                    const nodeThird = {id: `2_${s}`, name: `区${s}`, children: childThird};
                    childSecond.push(nodeThird);
                }
                const nodeSecond = {id: `1_${j}`, name: `市${j}`, children: childSecond};
                childFirst.push(nodeSecond);
            }
            const nodeFirst = {id: `0_${i}`, name: `省${i}`, children: childFirst};
            this.treeData.push(nodeFirst);
        }

    }

    getTreeData(): Array<NzTreeNode> {
        return this.loadData(this.treeData);
    }

    /**
     * 实例化成nzTree节点
     * @param treeData
     */
    private loadData(treeData) {
        const loop = (nodeList) => {
            if (Array.isArray(nodeList) && nodeList.length) {
                const arrTree = [];
                nodeList.forEach((node: any) => {
                    if (node) {
                        let treeNode: NzTreeNode;
                        treeNode = new NzTreeNode({
                            title: node.name,
                            key: node.id,
                            children: loop(node.children),
                            isLeaf: node.children.length === 0
                        });
                        arrTree.push(treeNode);
                    }
                });
                return arrTree;
            }
        };
        return loop(treeData);
    }

}
