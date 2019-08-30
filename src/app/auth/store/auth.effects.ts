import { ExceptionHandlerService } from './../../core/services/exception-handler.service';
import { Injectable, NgZone } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthActionTypes, AuthErrorAction, SigninSuccessAction, SignoutAction, SignoutSuccessAction, GetAuthInfoSuccessAction, GetAuthInfoAction } from './auth.actions';
import { Router } from '@angular/router';
import { GenericAction } from 'src/app/core/models/generic-action.model';
import { NotificationHandlerService } from 'src/app/core/services/notification-handler.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private ngZone: NgZone,
        private router: Router,
        private authService: AuthService,
        private notificationHandlerService: NotificationHandlerService,
        private exceptionHandlerService: ExceptionHandlerService
    ) { }

    // Listen for the 'LOGIN' action
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNIN),
        switchMap((action: GenericAction) => {
            return this.authService.login(action.payload)
                .pipe(
                    // If successful, dispatch success action with result
                    map((data: any) => {
                        // Store the user data in cookies
                        // this.authService.setUser(data.user);
                        // Store the token data in cookies
                        this.authService.setAccessToken(data);
                        // Redirect the user to home
                        this.router.navigate(['/dashboard']);
                        // Return the success action
                        return new SigninSuccessAction(data);
                    }),
                    // If request fails, dispatch failed action
                    catchError((error) => of(new AuthErrorAction(error)))
                );
        })
    );


    // For authorizing user into platform
    @Effect()
    getAuthInfo: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.GET_AUTH_INFO),
        switchMap(() => this.authService.getAuthInfo().pipe(
            map((res: any) => {
                this.authService.setUser(res.data);
                return new GetAuthInfoSuccessAction(res.data);
            }),
            // If request fails, dispatch failed action
            catchError((error) => of(new AuthErrorAction(error)))
        ))
    );

    // For authorizing user into platform
    @Effect()
    authorize: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.AUTHORIZE),
        switchMap(() => this.authService.getAccessTokenAsObs().pipe(
            map((res: any) => res ? new SigninSuccessAction(res) : new SignoutAction()),
            // If request fails, dispatch failed action
            catchError((error) => of(new AuthErrorAction(error)))
        ))
    );

    // For handling logout action
    @Effect()
    logout: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNOUT),
        map(() => {
            this.authService.logout();
            // this.router.navigate(['/auth/login']);

            // Workaround for issue:
            // Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?
            this.ngZone.run(() => this.router.navigate(['/auth/login'])).then();

            return new SignoutSuccessAction();
        })
    );

    // For handling error messages
    @Effect({ dispatch: false })
    handleError: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.AUTH_ERROR),
        tap((action: GenericAction) => {
            this.exceptionHandlerService.handleErrors(action.payload);
        })
    );
}
