import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ResponseResult} from '../shared/model/response-result.model';

@Injectable()
export class MemberService {

    // 地区切换
    switchArea = new Subject<any>();
    switchAreaHook: Observable<any> = this.switchArea.asObservable();

    // 右键点击
    contextmenu = new Subject<any>();
    contextmenuHook: Observable<any> = this.contextmenu.asObservable();

    constructor(private $httpSrv: HttpClient) {

    }

    getGeoJson(url): Observable<any> {
        return this.$httpSrv.get<ResponseResult>(url);
    }

    commitSwitchArea(data): void {
        this.switchArea.next(data);
    }

    commitContextmenu(data): void {
        this.contextmenu.next(data);
    }

}
