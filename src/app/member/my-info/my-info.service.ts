import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyInfoService {

    // 定义发布者
    mapSwitch = new Subject<any>();

    constructor() {

    }

}
