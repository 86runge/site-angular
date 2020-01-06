import {Component, OnInit} from '@angular/core';
import {AuthorityService} from './shared/service/authority/authority.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public title = 'app';
    public isLogin: boolean;

    constructor(private $authSrv: AuthorityService) {

    }

    ngOnInit() {
        // 判断是否登录
        this.isLogin = !!this.$authSrv.getRole();

    }
}
