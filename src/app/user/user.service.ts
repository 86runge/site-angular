import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../shared/service/url/url.service';
import {UserInfo} from '../shared/model/user-info.model';
import {Observable} from 'rxjs';
import {ResponseResult} from '../shared/model/response-result.model';
import {URL_CONST} from '../shared/const/url.const';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private $http: HttpClient,
                private $urlSrv: UrlService) {
    }

    /**
     * 用户登录
     */
    login(user: UserInfo): Observable<ResponseResult> {
        const url = this.$urlSrv.getURL(URL_CONST.user.login);
        return this.$http.post<ResponseResult>(url, user);
    }
}
