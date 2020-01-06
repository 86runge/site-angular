/**
 * angular模块
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Injector, LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
/**
 * ng-zorro
 */
import {NgZorroAntdModule, NZ_I18N, zh_CN as NZ_CN} from 'ng-zorro-antd';
/**
 * primeng
 */
import {ConfirmationService} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
/**
 * redux
 */
/**
 * cookie
 */
import {CookieModule} from 'ngx-cookie';
/**
 * locale
 */
import {registerLocaleData} from '@angular/common';
import localeZh from '@angular/common/locales/zh';
import {I18N as zh_CN} from '../assets/i18n/zh_CN';
import {I18N as en_US} from '../assets/i18n/en_US';

import {InitAppInjector} from './app.consts';
import {AppComponent} from './app.component';
import {rootRouterConfig} from './app.routes';

import {environment} from '../environments/environment';
/**
 * 业务模块
 */
import {UserModule} from './user/user.module';
import {HomePageModule} from './home-page/home-page.module';
import {GoodModule} from './good/good.module';
import {MemberModule} from './member/member.module';
import {OrderModule} from './order/order.module';
import {TreeExampleModule} from './tree-example/tree-example.module';
import {SharedModule} from './shared/shared.module';

registerLocaleData(localeZh);

/**
 * language
 */
export function GetLanguage(): string {
    return 'zh_CN';
}


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        /*导入Angular模块*/
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,

        /*导入NgZorro模块*/
        NgZorroAntdModule,

        /*导入主路由*/
        RouterModule.forRoot(rootRouterConfig, {useHash: false}),

        /*导入cookie模块*/
        CookieModule.forRoot(),

        /*导入公共模块*/
        SharedModule,

        /*导入业务模块*/
        UserModule,
        HomePageModule,
        GoodModule,
        OrderModule,
        MemberModule,
        TreeExampleModule
    ],
    providers: [
        ConfirmationService,
        MessageService,
        {
            provide: NZ_I18N,
            useValue: NZ_CN
        },
        {
            provide: LOCALE_ID,
            useFactory: GetLanguage
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // 初始化全局变量
    constructor(private injector: Injector) {
        InitAppInjector(this.injector);
    }
}
