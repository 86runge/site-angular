import {Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {LoginComponent} from './login/login.component';
import {AuthorityGuardService} from '../shared/service/authority-guard/authority-guard.service';

/**
 * 登录模块路由
 */
export const userRouterConfig: Routes = [
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthorityGuardService],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }, {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];
