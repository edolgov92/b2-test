import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {
  reload(): void {
    location.reload();
  }
}
