import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {
  /**
   * Reloads page
   */
  reload(): void {
    location.reload();
  }
}
