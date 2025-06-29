import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Inject,
  inject,
  Input,
  input,
  OnInit,
  Output,
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
import { WorkToUpdateStore } from '../../stores/worktoupdatestore';
import { WorksStore } from '../../stores/worksstore';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-work-card',
  standalone: true,
  imports: [
    CommonModule,
    YouTubePlayerModule,
    YouTubePlayer,
    FontAwesomeModule,
  ],
  templateUrl: './work-card.component.html',
  styleUrl: './work-card.component.css',
})
export class WorkCardComponent implements DoCheck {
  workStore = inject(WorksStore);

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

  workToUpdateStore = inject(WorkToUpdateStore);

  Load!: () => void;
  ResizeWindow!: () => void;

  width = 250;
  height = 140;
  shortWidth = this.width;
  shortHeight = 444;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngDoCheck(): void {
    if (this.windowStore.innerWidth() < 640) {
      this.width = 250;
      this.height = 140;
      this.shortWidth = this.width;
      this.shortHeight = 444;
    } else if (
      this.windowStore.innerWidth() > 640 &&
      this.windowStore.innerWidth() < 768
    ) {
      this.width = 350;
      this.height = 196;
      this.shortWidth = this.width;
      this.shortHeight = 622;
    } else if (
      this.windowStore.innerWidth() > 768 &&
      this.windowStore.innerWidth() < 1024
    ) {
      this.width = 350;
      this.height = 196;
      this.shortWidth = this.width;
      this.shortHeight = 622;
    } else if (
      this.windowStore.innerWidth() > 1024 &&
      this.windowStore.innerWidth() < 1280
    ) {
      this.width = 400;
      this.height = 225;
      this.shortWidth = 225;
      this.shortHeight = 400;
    } else if (this.windowStore.innerWidth() > 1280) {
      this.width = 450;
      this.height = 253;
      this.shortWidth = 253;
      this.shortHeight = 450;
    }
  }

  toolsStore = inject(ToolsStore);

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

  // StartUpdating(work: Work) {
  //   this.workToUpdateStore.ChangeWorkToUpdate(work);
  //   window.scrollTo({
  //     behavior: 'smooth',
  //     top: 0,
  //   });
  // }

  async StartDeleting(work: Work) {
    // alert('sdfsdafsdaf');
    let StartDelete = confirm('Are you sure about the deletion?');
    if (StartDelete) {
      let DatabaseResult: any = await firstValueFrom(
        this.workStore.deleteWork(work.id)
      )
        .then((res) => {
          alert('Work deleting succeeded ✔');
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.workStore.loadWorks();
        });
    }
  }
}
