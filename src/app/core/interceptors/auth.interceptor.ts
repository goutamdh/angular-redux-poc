import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authService: AuthService;

    constructor(
        private injector: Injector,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('intercepted request ... ');
        // Check if the request needs to be authenticated
        if (req.params.get('noAuth')) { return next.handle(req); }

        // Dynamically inject this service to avoid cyclic dependencies
        this.authService = this.injector.get(AuthService);

        // Get the access token
        const data = this.authService.getAccessToken();

        // Check if the access token is present or not
        if (data) {
            // Clone the existing request header and attach custom properties
            const clonedReq = req.clone({
                // Append the token from the session and pass with every request
                headers: req.headers.append('Authorization', `Bearer ${data.token}`)
            });
            return next.handle(clonedReq).pipe(
                tap(
                    event => {
                        if (event instanceof HttpResponse) {
                            // do stuff with response if you want
                        }
                    },
                    err => {
                        // Check for unauthorized status and navigate to login page
                        if (err instanceof HttpErrorResponse && err.status === 401) {
                            // refresh token

                            // Logout user from the platform done inside `global-error.handler.ts`
                        } else {
                            return throwError(err);
                        }
                    }
                )
            );
        }
        return next.handle(req);
    }
}
