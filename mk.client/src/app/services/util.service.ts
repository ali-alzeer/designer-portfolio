import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  GetMediaSizeForScreen(deviceWidth: number) {
    if (deviceWidth < 412) {
      return {
        width: Math.round(deviceWidth * 0.8),
        height: Math.round((Math.round(deviceWidth * 0.8) * 9) / 16),
      };
    } else if (deviceWidth < 1024 && deviceWidth > 412) {
      return { width: 400, height: Math.round((400 * 9) / 16) };
    } else {
      return { width: 900, height: Math.round((900 * 9) / 16) };
    }
  }
}
