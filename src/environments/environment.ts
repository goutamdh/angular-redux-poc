// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const PROTOCOL = 'https://';
const DOMAIN = 'reqres.in';
const API_PORT = 4000;

export const environment = {
  production: false,
  apiUrl: `${PROTOCOL}${DOMAIN}`,
  websockeEnableDebug: false,
  defaultDateFormat: 'MMM Do, YYYY',
  // This is used for token key identifier in the cookies, should not contain any spaces
  // This should be changed for every client implementations
  cname: 'angular-redux-poc',
  cookieValidity: 365,
};
