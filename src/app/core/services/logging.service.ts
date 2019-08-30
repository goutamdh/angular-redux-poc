import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

  /**
   * Log the client errors onto a log monitoring platform
   *
   * @param {string} message
   * @param {string} channel
   * @memberof LoggingService
   */
  logError(message: string, channel: string) {
    // Log the error
  }
}
