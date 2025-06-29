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
  faTools,
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
import { Tool } from '../../models/tool.interface';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [
    CommonModule,
    YouTubePlayerModule,
    YouTubePlayer,
    FontAwesomeModule,
  ],
  templateUrl: './tool-card.component.html',
  styleUrl: './tool-card.component.css',
})
export class ToolCardComponent {
  ImageNotFound = false;

  faVideo = faVideo;
  faTrash = faTrash;
  faEdit = faEdit;
  faImage = faImage;
  faTools = faTools;

  adminStore = inject(AdminStore);

  renderer = inject(Renderer2);

  Load!: () => void;
  ResizeWindow!: () => void;

  width = 150;
  height = 150;

  constructor(private breakpointObserver: BreakpointObserver) {}

  toolsStore = inject(ToolsStore);

  @Input() tool: Tool = {
    id: 0,
    title: '',
    publicToolImageUrl: '',
  };

  // StartUpdating(work: Work) {
  //   this.workToUpdateStore.ChangeWorkToUpdate(work);
  //   window.scrollTo({
  //     behavior: 'smooth',
  //     top: 0,
  //   });
  // }

  async StartDeleting(tool: Tool) {
    let StartDelete = confirm('Are you sure about the deletion?');
    if (StartDelete) {
      let DatabaseResult: any = await firstValueFrom(
        this.toolsStore.deleteTool(tool.id)
      )
        .then((res) => {
          alert('Tool deleting succeeded ✔');
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.toolsStore.loadTools();
        });
    }
  }
}
