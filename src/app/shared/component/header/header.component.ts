import {Component, OnInit} from '@angular/core';
import {AuthorityService} from '../../service/authority/authority.service';
import {CookieService} from 'ngx-cookie';
import {LOGIN_URL, SYSTEM_CONFIG_NAME} from '../../const/authority.const';

@Component({
    selector: 'mysite-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private $Authority: AuthorityService,
        private $cookieSrv: CookieService,
    ) {
    }

    ngOnInit() {
    }

    logout() {
        // 服务端注销
        // this.$Authority.logout();

        // 模拟注销
        this.$Authority.removeRole();
        // 清除localStorage中配置信息
        if (window.localStorage) {
            localStorage.removeItem(SYSTEM_CONFIG_NAME);
        }
        this.$cookieSrv.put('historyUrl', window.location.href, {path: '/'});
        window.location.href = LOGIN_URL;
    }

}
