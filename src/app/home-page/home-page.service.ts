import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseResult} from '../shared/model/response-result.model';

@Injectable({
    providedIn: 'root'
})
export class HomePageService {

    constructor(private $httpSrv: HttpClient) {
    }

    get1(): Observable<any> {
        return this.$httpSrv.get<ResponseResult>(`assets/mapJson/province/hubei.json`);
    }

    get2(): Observable<any> {
        return this.$httpSrv.get<ResponseResult>(`assets/mapJson/province/jiangsu.json`);
    }

    get3(): Observable<any> {
        return this.$httpSrv.get<ResponseResult>(`assets/mapJson/province/zhejiang.json`);
    }

    get4(): Observable<any> {
        return this.$httpSrv.get<ResponseResult>(`assets/mapJson/province/guangdong.json`);
    }

}
