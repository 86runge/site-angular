import {Component, OnInit, TemplateRef} from '@angular/core';
import {Echarts, EchartsModel} from '../../shared/model/echarts.model';
import {MemberService} from '../member.service';
import {NzDropdownContextComponent, NzDropdownService} from 'ng-zorro-antd';
import {MyInfoService} from './my-info.service';

@Component({
    selector: 'mysite-my-info',
    templateUrl: './my-info.component.html',
    styleUrls: ['./my-info.component.scss'],
    providers: [MemberService]
})
export class MyInfoComponent implements OnInit {

    // 宽高自适应
    width: number;
    height: number;

    // 配置
    options: EchartsModel;
    geoJson: any;
    // 数据
    dataList: {}[] = [];
    areaId: string;
    // 右键出现弹框
    dropdown: NzDropdownContextComponent;
    dropdownArgs: any;
    // 右键点击是否在地图中
    isContextmenu: boolean;
    // 地图上下钻
    isUpable: boolean;
    isDownable: boolean;
    // 鼠标点击，拖动状态
    isDrag: boolean;
    private echarts: Echarts;

    constructor(private $memberSrv: MemberService,
                private nzDropdownService: NzDropdownService,
                private $myInfoSrv: MyInfoService) {
    }

    ngOnInit() {
        this.options = {
            title: {
                text: '地图数据',
                subtext: '这是echarts地图',
                sublink: ''
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (p / km2)'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            visualMap: {
                show: true,
                left: 'left',
                min: 0,
                max: 110000,
                text: ['最大', '最小'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightgreen', 'yellow', 'orangered']
                }
            },
            series: [{
                name: '地图',
                type: 'map',
                mapType: 'mapType', // 自定义扩展图表类型
                roam: true,
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {
                        label: {show: true},
                        border: '#000000',
                        areaColor: '#ffffff',
                        borderWidth: 1,
                        shadowBlur: 15,
                        shadowOffsetY: 10,
                        opacity: 1,
                        shadowColor: '#aaaaaa'
                    }
                },
                scaleLimit: {
                    min: 0.25,
                    max: 100
                },
                data: this.dataList
            }]
        };

        // 初始化记载地图
        this.initMap(`assets/mapData/world.json`);

        // 订阅右键点击事件
        this.$memberSrv.contextmenuHook.subscribe(res => {
            this.isContextmenu = res;
        });

        // 订阅地图变化
        this.$myInfoSrv.mapSwitch.subscribe(res => {
            // console.log(res);
        });
    }

    /**
     * 获取地图json文件
     * @param url
     */
    initMap(url) {
        this.$memberSrv.getGeoJson(url).subscribe(res => {
            if (res) {
                // 防止地图切换时鼠标不在地图上
                this.isContextmenu = false;
                this.geoJson = res;
                this.dataList.length = 0;
                res.features.forEach((item, index) => {
                    let val: number;
                    val = Math.round(Math.random() * 10 + 1) * 10000;
                    this.dataList.push({
                        name: item.properties.name,
                        id: item.properties.id,
                        dataIndex: index,
                        value: val
                    });
                });
            }
        });
    }

    // 手动切换地图
    initCountry(val: string): void {
        if (val === 'world') {
            this.initMap(`assets/mapData/world.json`);
        } else {
            this.areaId = val;
            this.initMap(`assets/mapData/countries/${this.areaId}.json`);
        }
    }

    initComplete(echarts: Echarts) {
        this.echarts = echarts;
        this.onEvent();
    }


    // 右键下拉框
    contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
        if (this.isContextmenu) {
            this.dropdown = this.nzDropdownService.create($event, template);
            const areaFocusId = this.dropdownArgs.id;
            this.isUpable = areaFocusId.length > 2;
            this.isDownable = areaFocusId.length < 6;
        }
    }


    // 地图上下钻
    selectDropdown(type: string): void {
        this.dropdown.close();
        const areaFocusId = this.dropdownArgs.id;
        // 上钻
        if (type === 'up') {
            if (areaFocusId.length === 4) {
                // 省地图上钻到国家
                this.initMap(`assets/mapData/countries/China.json`);
            }
            if (areaFocusId.length === 6) {
                // 市级地图上钻到省
                this.areaId = areaFocusId.substr(0, 2);
                this.initMap(`assets/mapData/province/${this.areaId}.json`);
            }
        }
        // 下钻
        if (type === 'down') {
            if (areaFocusId.length === 2) {
                // 国家地图下钻到省
                this.initMap(`assets/mapData/province/${areaFocusId}.json`);
            }
            if (areaFocusId.length === 4) {
                // 省地图下钻到城市，城市的地图code是6位, 如黄冈421100
                this.initMap(`assets/mapData/cities/${areaFocusId}00.json`);
            }
        }
    }

    // 地图鼠标事件
    onEvent(): void {

        let oldIndex = -1;
        let timeoutId = null;

        // 左键单击事件------高亮
        this.echarts.on('click', (parmas) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                this.echarts.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: parmas.dataIndex
                });
                this.echarts.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: oldIndex
                });
                if (oldIndex === parmas.dataIndex) {
                    oldIndex = -1;
                } else {
                    oldIndex = parmas.dataIndex;
                    this.$myInfoSrv.mapSwitch.next(parmas);
                }
            }, 300);
        });

        // 左键双击事件------跳转
        this.echarts.on('dblclick', (parmas) => {
            clearTimeout(timeoutId);
            window.open('http://www.echartsjs.com/index.html');
        });

        // 右键单击事件
        this.echarts.on('contextmenu', (parmas) => {
            this.dropdownArgs = parmas.data;
            this.$memberSrv.commitContextmenu(true);
        });

        // 移入事件------焦点进入地图中
        this.echarts.on('mouseover', (parmas) => {
            // console.log(parmas);
            // this.isContextmenu = true;
        });

        // 移出事件------焦点滑出地图外
        this.echarts.on('mouseout', (parmas) => {
            this.isContextmenu = false;
        });

        this.echarts.on('mousedown', (parmas) => {
            // console.log(parmas);
            this.isDrag = true;
        });

        this.echarts.on('mouseup', (parmas) => {
            // console.log(parmas);
            this.isDrag = false;
        });

    }

}
