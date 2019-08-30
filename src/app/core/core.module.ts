import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { GlobalErrorHandler } from './helpers/global-error.handler';
import { PreventLoggedInAccessGuard } from './guards/prevent-loggedin-access.guard';
import { CookieService } from 'ngx-cookie-service';
import { CommonUtilsService } from './services/common-utils.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggingService } from './services/logging.service';
import { ExceptionHandlerService } from './services/exception-handler.service';
import { NotificationHandlerService } from './services/notification-handler.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpService,
    // This is the error interceptor
    // that intercepts all the http error in the
    // application.
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    // This is the core interceptor
    // that intercepts all the http requests in the
    // application.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PreventLoggedInAccessGuard,
    CookieService,
    CommonUtilsService,
    ExceptionHandlerService,
    NotificationHandlerService,
    LoggingService,
    AuthService,
  ]
})
export class CoreModule { }
