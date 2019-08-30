import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Prevent user from coming back to login url if already logged in
 * https://stackoverflow.com/questions/38915893/angular2-prevent-authenticated-users-from-accessing-specific-routes
 *
 * @export
 * @class PreventLoggedInAccess
 * @implements {CanActivate}
 */
@Injectable()
export class PreventLoggedInAccessGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) { }

    canActivate() {
        const isLoggedIn = this.authService.isLoggedIn();
        if (isLoggedIn) {
            this.router.navigate(['/boards']);
            return false;
        }
        return true;
    }
}
