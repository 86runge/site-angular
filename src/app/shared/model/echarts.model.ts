import { EchartsModel } from './echarts.model';

// 声明echarts变量
declare const echarts: any;

export class Echarts {
	private _echarts: Echarts;

	constructor(el: Element, theme?: Object | string, opts?: Object) {
		this._echarts = echarts.init(el, theme, opts);
	}

	/**
	 * echarts地图
	 * @param mapName
	 * @param geoJson
	 */
	registerMap(mapName: string, geoJson: any): void {
		echarts.registerMap(mapName, geoJson);
	}

	/**
	 * echarts配置
	 * @param option
	 * @param notMerge
	 * @param lazyUpdate
	 */
	setOption(option: EchartsModel, notMerge?: boolean, lazyUpdate?: boolean): void {
		this._echarts.setOption(option, notMerge, lazyUpdate);
	}

	/**
	 * 数据量比较大，分片加载和处理
	 * @param opts 要增加数据的序列号 增加的数据
	 */
	appendData(opts: { seriesIndex?: string; data?: Array<any> }): string {
		return this._echarts.appendData(opts);
	}

	/**
	 * 获取echarts宽度
	 */
	getWidth(): number {
		return this._echarts.getWidth();
	}

	/**
	 * 获取echarts高度
	 */
	getHeight(): number {
		return this._echarts.getHeight();
	}

	getDom(): HTMLCanvasElement | HTMLDivElement {
		return this._echarts.getDom();
	}

	getOption(): Object {
		return this._echarts.getOption();
	}

	resize(opts?: { width?: number | string; height?: number | string; silent?: boolean }): void {
		this._echarts.resize(opts);
	}

	/**
	 * echarts图表行为
	 * @param payload
	 */
	dispatchAction(payload: Object): void {
		this._echarts.dispatchAction(payload);
	}

	/**
	 * 绑定事件
	 * @param eventName
	 * @param handler
	 * @param context
	 */
	on(eventName: string, handler: Function, context?: Object): void {
		this._echarts.on(eventName, handler, context);
	}

	/**
	 * 解绑事件
	 * @param eventName
	 * @param handler
	 */
	off(eventName: string, handler: Function): void {
		this._echarts.off(eventName, handler);
	}

	/**
	 * 转换坐标系上的点到像素坐标值。
	 * finder 用于指示『使用哪个坐标系进行转换』
	 * 通常地，可以使用 index 或者 id 或者 name 来定位
	 * @param finder
	 * @param value 要被转换的值。
	 * return 转换的结果为像素坐标值，以 echarts 实例的 dom 节点的左上角为坐标 [0, 0] 点。
	 */
	convertToPixel(
		finder:
			| {
					seriesIndex?: number;
					seriesId?: string;
					seriesName?: string;
					geoIndex?: number;
					geoId?: string;
					geoName?: string;
					xAxisIndex?: number;
					xAxisId?: string;
					xAxisName?: string;
					yAxisIndex?: number;
					yAxisId?: string;
					yAxisName?: string;
					gridIndex?: number;
					gridId?: string;
					gridName?: string;
			  }
			| string,
		value: Array<any> | string
	): Array<any> | string {
		return this._echarts.convertToPixel(finder, value);
	}

	/**
	 * 判断给定的点是否在指定的坐标系或者系列上
	 * @param finder finder 用于指示『在哪个坐标系或者系列上判断』 通常地，可以使用 index 或者 id 或者 name 来定位
	 * @param value
	 * 要被判断的点，为像素坐标值，以 echarts 实例的 dom 节点的左上角为坐标 [0, 0] 点。
	 */
	containPixel(
		finder:
			| {
					seriesIndex?: number;
					seriesId?: string;
					seriesName?: string;
					geoIndex?: number;
					geoId?: string;
					geoName?: string;
					xAxisIndex?: number;
					xAxisId?: string;
					xAxisName?: string;
					yAxisIndex?: number;
					yAxisId?: string;
					yAxisName?: string;
					gridIndex?: number;
					gridId?: string;
					gridName?: string;
			  }
			| string,
		value: Array<any>
	): boolean {
		return this._echarts.containPixel(finder, value);
	}

	/**
	 * 显示加载动画效果。可以在加载数据前手动调用改接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画
	 * @param type 可选，加载动画类型，目前只有一种'default'
	 * @param opts 可选，加载动画配置项，跟type有关，下面是默认配置项：
	 * default: {
	 * text: 'loading',
	 * color: '#c23531',
	 * textColor: '#000',
	 * maskColor: 'rgba(255, 255, 255, 0.8)',
	 * zlevel: 0
	 * }
	 */
	showLoading(type?: string, opts?: Object): void {
		this._echarts.showLoading(type, opts);
	}

	/**
	 * 隐藏loading动画
	 */
	hideLoading(): void {
		this._echarts.hideLoading();
	}

	/**
	 * 导出图表图片，返回一个 base64 的 URL，可以设置为Image的src。
	 * @param opts
	 */
	getDataURL(opts: {
		// 导出的格式，可选 png, jpeg
		type?: string;
		// 导出的图片分辨率比例，默认为 1。
		pixelRatio?: number;
		// 导出的图片背景色，默认使用 option 里的 backgroundColor
		backgroundColor?: string;
		// 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
		excludeComponents?: Array<string>;
	}): string {
		return this._echarts.getDataURL(opts);
	}

	/**
	 * 导出联动的图表图片，返回一个 base64 的 url，可以设置为Image的src。导出图片中每个图表的相对位置跟容器的相对位置有关。
	 * @param opts
	 */
	getConnectedDataURL(opts: {
		// 导出的格式，可选 png, jpeg
		type?: string;
		// 导出的图片分辨率比例，默认为 1。
		pixelRatio?: number;
		// 导出的图片背景色，默认使用 option 里的 backgroundColor
		backgroundColor?: string;
		// 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
		excludeComponents?: Array<string>;
	}): string {
		return this._echarts.getConnectedDataURL(opts);
	}

	/**
	 * 清空当前实例，会移除实例中所有的组件和图表。清空后调用 getOption 方法返回一个{}空对象。
	 */
	clear(): void {
		return this._echarts.clear();
	}

	/**
	 * 当前实例是否已经被释放。
	 */
	isDisposed(): boolean {
		return this._echarts.isDisposed();
	}

	/**
	 * 销毁实例，销毁后实例无法再被使用。
	 */
	dispose(): void {
		return this._echarts.dispose();
	}

	/**
     * 多个图表实例实现联动。
     * @param group
     * // 分别设置每个实例的 group id
     chart1.group = 'group1';
     chart2.group = 'group1';
     echarts.connect('group1');
     // 或者可以直接传入需要联动的实例数组
     echarts.connect([chart1, chart2]);
     */
	connect(group: string | Array<Echarts>): void {
		echarts.connect(group);
	}

	/**
	 * 解除图表实例的联动，如果只需要移除单个实例，可以将通过将该图表实例 group 设为空。
	 * @param group
	 */
	disconnect(group: string): void {
		echarts.disconnect(group);
	}
}

export interface EchartsModel {
	title?: Object;
	legend?: Object;
	grid?: Object;
	xAxis?: Object;
	yAxis?: Object;
	polar?: Object;
	radiusAxis?: Object;
	angleAxis?: Object;
	radar?: Object;
	dataZoom?: Array<Object>;
	visualMap?: Object | Array<Object>;
	tooltip?: Object;
	axisPointer?: Object;
	toolbox?: Object;
	brush?: Object;
	geo?: Object;
	parallel?: Object;
	parallelAxis?: Object;
	singleAxis?: Object;
	timeline?: Object;
	graphic?: Object | Array<Object>;
	calendar?: Object;
	dataset?: Object;
	aria?: Object;
	series?: Array<Object>;
	color?: Object;
	backgroundColor?: string;
	textStyle?: Object;
	animation?: boolean;
	animationThreshold?: boolean;
	animationDuration?: number;
	animationEasing?: string;
	animationDelay?: number;
	animationDurationUpdate?: number;
	animationEasingUpdate?: string;
	animationDelayUpdate?: string;
	progressive?: number;
	progressiveThreshold?: number;
	blendMode?: string;
	hoverLayerThreshold?: number;
	useUTC?: boolean;
}
