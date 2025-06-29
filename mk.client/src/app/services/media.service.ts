import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor() {}

  ////THIS IS FOR REGULAR VIDEOS ONLY
  // extractYoutubeVideoId(url: string): string {
  //   const youtubeRegex =
  //     /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([^#&?]*).*/;
  //   const match = youtubeRegex.exec(url);

  //   return match && match[1] ? match[1] : '';
  // }

  extractYouTubeId(url: string): { id: string; isShort: boolean } {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/|youtube\.com\/shorts\/)([^#&?]*).*/;
    const match = url.match(youtubeRegex);

    const isShort = url.includes('youtube.com/shorts/');
    if (match) {
      const videoId = match[1];
      return { id: videoId, isShort };
    } else {
      return { id: '', isShort };
    }
  }
}
