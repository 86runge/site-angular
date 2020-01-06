import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {AlertService} from '../../shared/service/alert/alert.service';
import {AuthorityService} from '../../shared/service/authority/authority.service';
import {LocalService} from '../../shared/service/local/local.service';

@Component({
    selector: 'mysite-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    validateForm: FormGroup;

    i18n: any;

    submitForm(): void {
        // 表单验证
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        // 登录
        this.login();
    }

    constructor(private fb: FormBuilder,
                private $userSrv: UserService,
                private $alertSrv: AlertService,
                private $authSrv: AuthorityService,
                private $localSrv: LocalService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: ['admin', [Validators.required]],
            password: ['admin', [Validators.required]],
            remember: [true]
        });

        this.i18n = this.$localSrv.i18n.login;
    }

    login(): void {
        const userName = this.validateForm.controls.userName.value;
        const password = this.validateForm.controls.password.value;
        const userInfo = {
            userName: userName,
            password: password
        };

        this.$alertSrv.tip(this.i18n.loginSuccess, () => {
            this.$authSrv.setRole(userInfo);
            this.$authSrv.skipLastPage();
        });

        // TODO: 暂无后台登录服务
        // this.$userSrv.login({
        //     userName: userName,
        //     password: password
        // }).subscribe(res => {
        //     if (res.success) {
        //         this.$authSrv.setRole(res.data);
        //         this.$alertSrv.tip(this.i18n.loginSuccess, () => {
        //             this.$authSrv.skipLastPage();
        //         });
        //     } else {
        //         this.$alertSrv.error(this.i18n.authority);
        //     }
        // }, () => {
        //     this.$alertSrv.error(this.i18n.netError);
        // });

    }

}
