import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { GlobalService } from '../global.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    dataAccResign: any;
    test: any;
    constructor(
        private globalService: GlobalService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userLogin = this.globalService.getAuth();
        if (userLogin !== null) {
            this.router.navigate(['home']);
            return false;
        } 
        return true;
    }


}
