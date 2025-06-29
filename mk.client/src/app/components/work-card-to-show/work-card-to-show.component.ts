import {
  AfterViewInit,
  Component,
  DoCheck,
  inject,
  Input,
  input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Work } from '../../models/works.interface';
import { ToolsStore } from '../../stores/toolsstore';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { UtilService } from '../../services/util.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MediaService } from '../../services/media.service';
import {
  faVideo,
  faTrash,
  faEdit,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WindowStore } from '../../stores/windowstore';
import { CommonModule } from '@angular/common';
import { AdminStore } from '../../stores/adminstore';
import { LanguageStore } from '../../stores/languagestore';
import { Language } from '../../models/language.interface';
import { WorksService } from '../../services/works.service';
import { WorksStore } from '../../stores/worksstore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-card-to-show',
  standalone: true,
  imports: [
    CommonModule,
    YouTubePlayerModule,
    YouTubePlayer,
    FontAwesomeModule,
  ],
  templateUrl: './work-card-to-show.component.html',
  styleUrl: './work-card-to-show.component.css',
})
export class WorkCardToShowComponent {
  ImageNotFound = false;

  faVideo = faVideo;
  faTrash = faTrash;
  faEdit = faEdit;
  faImage = faImage;

  adminStore = inject(AdminStore);

  utilService = inject(UtilService);

  mediaService = inject(MediaService);

  windowStore = inject(WindowStore);

  renderer = inject(Renderer2);

  Load!: () => void;
  ResizeWindow!: () => void;
  width = 0;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngDoCheck(): void {
    if (this.windowStore.innerWidth() <= 640) {
      this.width = this.windowStore.innerWidth();
    } else if (
      this.windowStore.innerWidth() > 640 &&
      this.windowStore.innerWidth() <= 768
    ) {
      this.width = this.windowStore.innerWidth() / 2;
    } else if (
      this.windowStore.innerWidth() > 768 &&
      this.windowStore.innerWidth() <= 1024
    ) {
      this.width = this.windowStore.innerWidth() / 2;
    } else if (
      this.windowStore.innerWidth() > 1024 &&
      this.windowStore.innerWidth() <= 1280
    ) {
      this.width = this.windowStore.innerWidth() / 3;
    } else if (this.windowStore.innerWidth() > 1280) {
      this.width = this.windowStore.innerWidth() / 4;
    }
  }

  toolsStore = inject(ToolsStore);
  worksStore = inject(WorksStore);
  router = inject(Router);

  @Input() work: Work = {
    id: 0,
    createdOn: new Date(),
    description: '',
    publicWorkMediaUrl: '',
    title: '',
    type: 'image',
    updatedOn: new Date(),
    toolsIds: [],
  };

  ShowSlider(event: any) {
    if (event.target !== undefined && this.work.id !== 0) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
      let index: number = this.worksStore.works().indexOf(this.work);
      this.router.navigateByUrl(`details/${index}`);
    }
  }
}
