/**
 * 通用常量类
 */
import {Injector} from '@angular/core';

export let COMMON_INJECTOR: Injector;

export function InitCommonInjector(i: Injector) {
    COMMON_INJECTOR = i;
}
