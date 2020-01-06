import {Injector} from '@angular/core';

export let APP_INJECTOR: Injector;

export function InitAppInjector(i: Injector) {
    APP_INJECTOR = i;
}
