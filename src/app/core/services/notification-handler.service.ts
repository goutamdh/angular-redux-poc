import { Injectable } from '@angular/core';

@Injectable()
export class NotificationHandlerService {

  constructor() {}

  /**
   * Show on success
   * @param message Message to display
   */
  success(message: string) {
    // this.notifier.notify('success', message || 'Empty message');
    alert(message);
  }

  /**
   * Show on warning
   * @param message Message to display
   */
  warning(message: string) {
    // this.notifier.notify('warning', message || 'Empty message');
    alert(message);
  }

  /**
   * Show on error
   * @param message Message to display
   */
  error(message: string) {
    // this.notifier.notify('error', message || 'Empty message');
    alert(message);
  }

  /**
   * Show on info
   * @param message Message to display
   */
  info(message: string) {
    // this.notifier.notify('info', message || 'Empty message');
    alert(message);
  }

  /**
   * Show on default
   * @param message Message to display
   */
  default(message: string) {
    // this.notifier.notify('default', message || 'Empty message');
    alert(message);
  }
}
