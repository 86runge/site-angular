import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page.component';
import {AuthorityGuardService} from '../shared/service/authority-guard/authority-guard.service';

export const homePageRouterConfig: Routes = [
    {
        path: 'home-page',
        component: HomePageComponent,
        canActivate: [AuthorityGuardService]
    }
];
