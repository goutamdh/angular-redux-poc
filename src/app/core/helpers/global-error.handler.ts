import { SignoutAction } from './../../auth/store/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.states';
import { ExceptionHandlerService } from '../services/exception-handler.service';
import { LoggingService } from '../services/logging.service';

/**
 * Global handler for error handling
 * Inspired from: https://blog.angularindepth.com/expecting-the-unexpected-best-practices-for-error-handling-in-angular-21c3662ef9e4
 *
 * @export
 * @class GlobalErrorHandler
 * @implements {ErrorHandler}
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private store: Store<AppState>,
        private loggingService: LoggingService,
        private exceptionHandler: ExceptionHandlerService
    ) {}
    /**
     * Custom error handling
     *
     * @param {HttpErrorResponse} error
     * @memberof GlobalErrorHandler
     */
    handleError(error: HttpErrorResponse) {
        console.log(error);
        const { status } = error;
        switch (status) {
            case 401:
                this.store.dispatch(new SignoutAction());
                break;

            default:
                break;
        }
        // Send the error log to error monitor
        this.loggingService.logError(error.error, null);
        // Show error notification to the user
        this.exceptionHandler.handleErrors(error);
        // your custom error handling logic
    }
}
