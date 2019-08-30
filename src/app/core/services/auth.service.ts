import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { CommonUtilsService } from './common-utils.service';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {
  static COOKIE_USER = `${environment.cname}.user`;
  static COOKIE_TOKEN = `${environment.cname}.token`;
  static COOKIE_USER_ROLE = `${environment.cname}.role`;

  user: any = null;
  accessToken: any = null;

  constructor(
    private httpService: HttpService,
    private commonUtilsService: CommonUtilsService
  ) { }

  /**
   * Authenticate the user with the api
   *
   * @param {{ username: string, password: string}} user
   * @returns
   * @memberof AuthService
   */
  login(user: { username: string, password: string }) {
    // Form the request headers
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    // Form the params headers
    const params = new HttpParams();
      // Note:- Don't use this property in any other call
      // This will prevent the interceptor to act on this request
      // .append('noAuth', 'true');

    // Form the options object
    const options = { headers, params };

    // Create the urlencoded data to be sent to the authentication server
    const data = {
      email: user.username,
      password: user.password
    };

    return this.httpService.post(`${environment.apiUrl}/api/login`, data, options);
  }

  /**
   * Logout the user
   *
   * @memberof AuthService
   */
  logout() {
    // Delete all session data
    this.destroy();
  }

  /**
   * Dummy endpoint to get the authentication information
   *
   * @returns
   * @memberof AuthService
   */
  getAuthInfo() {
    return this.httpService.get(`${environment.apiUrl}/api/users/1`);
  }

  /**
   * Check if the user is logged in
   */
  isLoggedIn(): boolean {
    return this.commonUtilsService.getDataFromCookies(AuthService.COOKIE_TOKEN) ? true : false;
  }

  /**
   * Save the user session to cookies
   *
   * @param user Authenticated user
   */
  setUser(user: IUser) {
    this.user = user;
    this.commonUtilsService.setDataInCookies(AuthService.COOKIE_USER, this.user);
  }

  /**
   * Get the details of the authenticated user
   */
  getUser() {
    try {
      if (this.user !== undefined) {
        this.user = this.commonUtilsService.getDataFromCookies(AuthService.COOKIE_USER);
      }
      return this.user;
    } catch (error) {
      return this.user;
    }
  }

  /**
   * Save the token into cookies
   *
   * @param token Authenticated token
   */
  setAccessToken(token: any) {
    this.accessToken = token;
    this.commonUtilsService.setDataInCookies(AuthService.COOKIE_TOKEN, this.accessToken);
  }

  /**
   * Get back the token from cookies
   */
  getAccessToken() {
    try {
      if (this.accessToken !== undefined) {
        this.accessToken = this.commonUtilsService.getDataFromCookies(AuthService.COOKIE_TOKEN);
      }
      return this.accessToken;
    } catch (error) {
      return this.accessToken;
    }
  }

  /**
   * Get back the token as observable
   */
  getAccessTokenAsObs(): Observable<any> {
    return Observable.create((observer: any) => {
      if (this.accessToken !== undefined) {
        this.accessToken = this.commonUtilsService.getDataFromCookies(AuthService.COOKIE_TOKEN);
      }
      observer.next(this.accessToken);
      observer.complete();
    });
  }

  /**
   * Clear all the token details
   */
  private destroy() {
    this.setAccessToken(null);
    this.setUser(null);
    // Remove the user and token details from the cookies
    this.commonUtilsService.removeCookie(AuthService.COOKIE_USER);
    this.commonUtilsService.removeCookie(AuthService.COOKIE_TOKEN);
    this.commonUtilsService.removeCookie(AuthService.COOKIE_USER_ROLE);
  }
}
