import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDropdownContextComponent, NzDropdownService, NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeComponent, NzTreeNode} from 'ng-zorro-antd';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'mysite-order-operate',
    templateUrl: './order-operate.component.html',
    styleUrls: ['./order-operate.component.scss']
})
export class OrderOperateComponent implements OnInit {

    // tabs标签
    tabs = [];
    nzTabPosition = 'top';
    selectedIndex = 0;

    // tag标签
    hotTags = ['Movie', 'Books', 'Music', 'Sports'];
    selectedTags = [];

    tags = ['Unremovable', 'Tag 2', 'Tag 3'];
    inputVisible = false;
    inputValue = '';
    @ViewChild('inputElement') inputElement: ElementRef;

    // 树形结构
    defaultCheckedKeys = ['0-0-0'];
    defaultSelectedKeys = [];
    defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

    @ViewChild('treeCom') treeCom;
    searchValue;

    nodes = [{
        title: '0-0',
        key: '0-0',
        expanded: true,
        children: [{
            title: '0-0-0',
            key: '0-0-0',
            children: [
                {title: '0-0-0-0', key: '0-0-0-0', icon: 'anticon anticon-meh-o', isLeaf: true},
                {title: '0-0-0-1', key: '0-0-0-1', icon: 'anticon anticon-frown-o', isLeaf: true},
                {title: '0-0-0-2', key: '0-0-0-2', icon: 'anticon anticon-smile-o', isLeaf: true}
            ]
        }, {
            title: '0-0-1',
            key: '0-0-1',
            children: [
                {title: '0-0-1-0', key: '0-0-1-0', isLeaf: true},
                {title: '0-0-1-1', key: '0-0-1-1', isLeaf: true},
                {title: '0-0-1-2', key: '0-0-1-2', isLeaf: true}
            ]
        }, {
            title: '0-0-2',
            key: '0-0-2',
            isLeaf: true
        }]
    }, {
        title: '0-1',
        key: '0-1',
        children: [
            {title: '0-1-0-0', key: '0-1-0-0', isLeaf: true},
            {title: '0-1-0-1', key: '0-1-0-1', isLeaf: true},
            {title: '0-1-0-2', key: '0-1-0-2', isLeaf: true}
        ]
    }, {
        title: '0-2',
        key: '0-2',
        isLeaf: true
    }];

    // 拖动数据
    _nodes_ = [{
        title: '0-0',
        key: '00',
        expanded: true,
        children: [{
            title: '0-0-0',
            key: '000',
            expanded: true,
            children: [
                {title: '0-0-0-0', key: '0000', isLeaf: true},
                {title: '0-0-0-1', key: '0001', isLeaf: true},
                {title: '0-0-0-2', key: '0002', isLeaf: true}
            ]
        }, {
            title: '0-0-1',
            key: '001',
            children: [
                {title: '0-0-1-0', key: '0010', isLeaf: true},
                {title: '0-0-1-1', key: '0011', isLeaf: true},
                {title: '0-0-1-2', key: '0012', isLeaf: true}
            ]
        }, {
            title: '0-0-2',
            key: '002'
        }]
    }, {
        title: '0-1',
        key: '01',
        children: [{
            title: '0-1-0',
            key: '010',
            children: [
                {title: '0-1-0-0', key: '0100', isLeaf: true},
                {title: '0-1-0-1', key: '0101', isLeaf: true},
                {title: '0-1-0-2', key: '0102', isLeaf: true}
            ]
        }, {
            title: '0-1-1',
            key: '011',
            children: [
                {title: '0-1-1-0', key: '0110', isLeaf: true},
                {title: '0-1-1-1', key: '0111', isLeaf: true},
                {title: '0-1-1-2', key: '0112', isLeaf: true}
            ]
        }]
    }, {
        title: '0-2',
        key: '02',
        isLeaf: true
    }];

    // 搜索
    _nodes = [
        {title: 'Expand to load', key: '0'},
        {title: 'Expand to load', key: '1'},
        {title: 'Tree Node', key: '2', isLeaf: true}
    ];

    // 目录
    nodes_ = [{
        title: 'parent 0',
        key: '100',
        author: 'NG ZORRO',
        expanded: true,
        children: [
            {title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true},
            {title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true}
        ]
    }, {
        title: 'parent 1',
        key: '101',
        author: 'NG ZORRO',
        children: [
            {title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true},
            {title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true}
        ]
    }];

    dropdown: NzDropdownContextComponent;
    activedNode: NzTreeNode;

    @ViewChild('_treeCom') _treeCom: NzTreeComponent;

    constructor(private nzDropdownService: NzDropdownService) {

    }

    ngOnInit(): void {
        // tabs标签
        for (let i = 0; i < 11; i++) {
            this.tabs.push({
                name: `Tab ${i}`,
                content: `Content of tab ${i}`
            });
        }
    }

    /**
     * tabs标签
     * @param args
     */
    log(args: any[]): void {
        console.log(args);
    }

    /**
     * tag标签
     * @param checked
     * @param tag
     */
    handleChange(checked: boolean, tag: string): void {
        if (checked) {
            this.selectedTags.push(tag);
        } else {
            this.selectedTags = this.selectedTags.filter(t => t !== tag);
        }
        console.log('You are interested in: ', this.selectedTags);
    }

    handleClose(removedTag: {}): void {
        this.tags = this.tags.filter(tag => tag !== removedTag);
    }

    sliceTagName(tag: string): string {
        const isLongTag = tag.length > 20;
        return isLongTag ? `${tag.slice(0, 20)}...` : tag;
    }

    showInput(): void {
        this.inputVisible = true;
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        }, 10);
    }

    handleInputConfirm(): void {
        if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
            this.tags.push(this.inputValue);
        }
        this.inputValue = '';
        this.inputVisible = false;
    }

    /**
     * 树形结构
     * @param event
     */
    nzEvent(event: NzFormatEmitEvent): void {
        console.log(event, this.treeCom);
    }

    nzAction(event: NzFormatEmitEvent): void {
        console.log(event);
    }

    beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
        // if insert node into another node, wait 1s
        if (arg.pos === 0) {
            return of(true).pipe(delay(1000));
        } else {
            return of(false);
        }
    }

    /**
     * 目录
     * @param data
     */
    openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
        // do something if u want
        if (data instanceof NzTreeNode) {
            data.isExpanded = !data.isExpanded;
        } else {
            data.node.isExpanded = !data.node.isExpanded;
        }
    }

    activeNode(data: NzFormatEmitEvent): void {
        if (this.activedNode) {
            // delete selectedNodeList(u can do anything u want)
            this.treeCom.nzTreeService.setSelectedNodeList(this.activedNode);
        }
        data.node.isSelected = true;
        this.activedNode = data.node;
        // add selectedNodeList
        this.treeCom.nzTreeService.setSelectedNodeList(this.activedNode);
    }

    /**
     * 右键单击事件
     * @param $event
     * @param template
     */
    contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
        this.dropdown = this.nzDropdownService.create($event, template);
    }

    selectDropdown(type: string): void {
        this.dropdown.close();
        // do something
    }


}
