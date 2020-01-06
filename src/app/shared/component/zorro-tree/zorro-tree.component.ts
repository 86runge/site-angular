import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';
import {Observable} from 'rxjs';

@Component({
    selector: 'mysite-zorro-tree',
    templateUrl: './zorro-tree.component.html',
    styleUrls: ['./zorro-tree.component.scss']
})
export class ZorroTreeComponent implements OnInit {

    @ViewChild('treeCom') treeCom;

    /**
     * 导入参数
     */
    // 元数据 NzTreeNodeOptions[] / NzTreeNode[]
    public _nodes: NzTreeNode[] = [];
    @Input() set nodes(value: NzTreeNode[]) {
        this._nodes = value;
    }

    // 展开指定的树节点,双向绑定
    public _nzExpandedKeys: string[] = [];
    @Input() set nzExpandedKeys(value: string[]) {
        this._nzExpandedKeys = value;
    }

    // 指定选中复选框的树节点,双向绑定
    public _nzCheckedKeys: string[] = [];
    @Input() set nzCheckedKeys(value: string[]) {
        this._nzCheckedKeys = value;
    }

    // 指定选中的树节点，双向绑定
    public _nzSelectedKeys: string[] = [];
    @Input() set nzSelectedKeys(value: string[]) {
        this._nzSelectedKeys = value;
    }

    // 按需筛选树高亮节点(参考可搜索的树),双向绑定
    public _nzSearchValue: string = null;
    @Input() set nzSearchValue(value: string) {
        this._nzSearchValue = value;
    }

    // 默认展开所有树节点
    public _nzExpandAll = false;
    @Input() set nzExpandAll(value: boolean) {
        this._nzExpandAll = value;
    }

    // 节点前添加 Checkbox 复选框
    public _nzCheckable = false;
    @Input() set nzCheckable(value: boolean) {
        this._nzCheckable = value;
    }

    // 支持点选多个节点（节点本身）
    public _nzMultiple = false;
    @Input() set nzMultiple(value: boolean) {
        this._nzMultiple = value;
    }

    // checkable状态下节点选择完全受控（父子节点选中状态不再关联）
    public _nzCheckStrictly = false;
    @Input() set nzCheckStrictly(value: boolean) {
        this._nzCheckStrictly = value;
    }

    // 节点前添加展开图标，默认添加
    public _nzShowExpand = true;
    @Input() set nzShowExpand(value: boolean) {
        this._nzShowExpand = value;
    }

    // 是否展示连线，默认不展示
    public _nzShowLine = false;
    @Input() set nzShowLine(value: string[]) {
        this._nzExpandedKeys = value;
    }

    // 是否展示 TreeNode title 前的图标，没有默认样式
    public _nzShowIcon = false;
    @Input() set nzShowIcon(value: boolean) {
        this._nzShowIcon = value;
    }

    // 是否异步加载(显示加载状态)
    public _nzAsyncData = false;
    @Input() set nzAsyncData(value: boolean) {
        this._nzAsyncData = value;
    }

    // 设置节点可拖拽（IE>8）
    public _nzDraggable = false;
    @Input() set nzDraggable(value: boolean) {
        this._nzDraggable = value;
    }

    // drop前二次校验,允许用户自行决定是否允许放置
    public _nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
    @Input() set nzBeforeDrop(value: any) {
        this._nzBeforeDrop = value;
    }

    /**
     * 导出事件
     */
    @Output() clickEvent = new EventEmitter<any>();
    @Output() dbClickEvent = new EventEmitter<any>();
    @Output() contextMenuEvent = new EventEmitter<any>();
    @Output() checkBoxChangeEvent = new EventEmitter<any>();
    @Output() expandChangeEvent = new EventEmitter<any>();
    @Output() searchValueChangeEvent = new EventEmitter<any>();
    @Output() dragStartEvent = new EventEmitter<any>();
    @Output() dragEnterEvent = new EventEmitter<any>();
    @Output() dragOverEvent = new EventEmitter<any>();
    @Output() dragLeaveEvent = new EventEmitter<any>();
    @Output() dropEvent = new EventEmitter<any>();
    @Output() dragEndEvent = new EventEmitter<any>();

    // 搜索类容
    public searchValue: string;

    constructor() {
    }

    ngOnInit() {

    }

    /**
     * 点击树节点触发
     * @param  event
     */
    public nzClick(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * 双击树节点触发
     * @param  event
     */
    public nzDblClick(event: NzFormatEmitEvent) {
        this.dbClickEvent.emit(event);
    }

    /**
     * 右键树节点触发
     * @param  event
     */
    public nzContextMenu(event: NzFormatEmitEvent) {
        this.contextMenuEvent.emit(event);
    }

    /**
     * 点击树节点 Checkbox 触发
     * @param  event
     */
    public nzCheckBoxChange(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * 点击展开树节点图标触发
     * @param  event
     */
    public nzExpandChange(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * 搜索节点时调用(与nzSearch eventue配合使用)
     * @param  event
     */
    public nzSearchValueChange(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * 开始拖拽时调用
     * @param  event
     */
    public nzOnDragStart(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * dragenter 触发时调用
     * @param  event
     */
    public nzOnDragEnter(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * dragover 触发时调用
     * @param  event
     */
    public nzOnDragOver(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * dragleave 触发时调用
     * @param  event
     */
    public nzOnDragLeave(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * drop 触发时调用
     * @param  event
     */
    public nzOnDrop(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * dragend 触发时调用
     * @param  event
     */
    public nzOnDragEnd(event: NzFormatEmitEvent) {
        this.clickEvent.emit(event);
    }

    /**
     * 获取组件NzTreeNode节点
     * @return Array<NzTreeNode>
     */
    public getTreeNodes(): Array<NzTreeNode> {
        return this.treeCom.getTreeNodes();
    }

    /**
     * 获取组件 checkBox 被点击选中的节点
     * @return Array<NzTreeNode>
     */
    public getCheckedNodeList(): Array<NzTreeNode> {
        return this.treeCom.getCheckedNodeList();
    }

    /**
     * 获取组件被选中的节点
     * @return Array<NzTreeNode>
     */
    public getSelectedNodeList(): Array<NzTreeNode> {
        return this.treeCom.getSelectedNodeList();
    }

    /**
     * 获取组件半选状态节点
     * @return Array<NzTreeNode>
     */
    public getHalfCheckedNodeList(): Array<NzTreeNode> {
        return this.treeCom.getHalfCheckedNodeList();
    }

    /**
     * 获取组件展开状态节点
     * @return Array<NzTreeNode>
     */
    public getExpandedNodeList(): Array<NzTreeNode> {
        return this.treeCom.getExpandedNodeList();
    }

    /**
     * 获取组搜索匹配到的节点
     * @return Array<NzTreeNode>
     */
    public getMatchedNodeList(): Array<NzTreeNode> {
        return this.treeCom.getMatchedNodeList();
    }

}
