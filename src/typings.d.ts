/* SystemJS model definition */
declare var module: NodeModule;

interface NodeModule {
    id: string;
}

declare module '*.json' {
    const value: any;
    export default value;
}

/* 非TS框架集成：声明第三方库，之后可以在代码中直接使用，拥有@types库的不需要进行声明，例如jquery */
declare const echarts: any;
