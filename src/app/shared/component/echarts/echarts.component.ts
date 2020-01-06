import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Echarts, EchartsModel} from '../../model/echarts.model';
import {fromEvent} from 'rxjs';

@Component({
    selector: 'mysite-echarts',
    templateUrl: './echarts.component.html',
    styleUrls: ['./echarts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EchartsComponent implements OnInit, OnChanges, OnDestroy {

    // options配置参数
    @Input() options: EchartsModel;
    // echarts数据
    @Input() geoJson: any;
    // 主题: 使用默认主题，主题有单独的文件，可在init初始化时指定
    @Input() theme: Object | string = 'default';
    // 画板宽高，默认占满父级
    @Input() width: number;
    @Input() height: number;

    // 自定义事件
    @Output() initBefore = new EventEmitter<any>();
    @Output() initComplete = new EventEmitter<any>();

    echarts: Echarts;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        // 地图随窗口大小变动
        fromEvent(window, 'resize')
            .subscribe(event => {
                this.echarts.resize();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.echarts) {
            this.dispose();
        }
        // 判断是否是地图----地图特殊处理
        if (this.findSeriesIndex(this.options) !== -1) {
            // 如果@Input()传入的值存在异步请求重新赋值，则会多次执行，这里取最后一次变化值
            if (changes.geoJson.currentValue) {
                this.init();
            }
        } else {
            this.init();
        }
    }

    ngOnDestroy(): void {
        this.dispose();
    }

    init(): void {
        if (!this.echarts) {
            this.initBefore.emit();
            this.echarts = new Echarts(this.el.nativeElement, this.theme, {
                width: this.width,
                height: this.height
            });
            const mapIndex = this.findSeriesIndex(this.options);
            if (this.geoJson && mapIndex !== -1) {
                const mapType = this.options.series[mapIndex]['mapType'];
                this.echarts.registerMap(mapType, this.geoJson);
            }
            this.echarts.setOption(this.options);
            this.initComplete.emit(this.echarts);
        }
    }

    private dispose(): void {
        this.echarts.dispose();
        this.echarts = null;
    }

    private findSeriesIndex(option): number {
        const series = option.series;
        if (series) {
            for (let i = 0, len = series.length; i < len; i++) {
                if (series[i]['type'] && series[i]['type'] === 'map') {
                    return i;
                }
            }
        }

        return -1;
    }


}
