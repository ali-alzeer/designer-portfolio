import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
  OnInit,
} from '@angular/core';
import { WorksStore } from '../../stores/worksstore';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WorksService } from '../../services/works.service';
import { CommonModule } from '@angular/common';
import { YouTubePlayer } from '@angular/youtube-player';
import { ToolsStore } from '../../stores/toolsstore';
import { WorkCardToShowComponent } from '../work-card-to-show/work-card-to-show.component';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-works-to-show',
  standalone: true,
  imports: [
    YouTubePlayer,
    ReactiveFormsModule,
    CommonModule,
    WorkCardToShowComponent,
    FontAwesomeModule,
  ],
  templateUrl: './works-to-show.component.html',
  styleUrl: './works-to-show.component.css',
})
export class WorksToShowComponent implements DoCheck {
  PageNumber = 1;
  PageSize = 10;

  DisableNext = false;

  store = inject(WorksStore);
  toolsStore = inject(ToolsStore);

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  ngDoCheck(): void {
    if (
      this.PageNumber === Math.ceil(this.store.worksCount() / this.PageSize) ||
      this.store.worksCount() <= this.PageSize
    ) {
      this.DisableNext = true;
    } else {
      this.DisableNext = false;
    }
  }

  PrevoiusPage() {
    if (this.PageNumber !== 1) {
      this.PageNumber--;
    }
  }

  NextPage() {
    if (
      this.PageNumber === Math.ceil(this.store.worksCount() / this.PageSize) ||
      this.store.worksCount() <= this.PageSize
    ) {
      this.DisableNext = true;
    } else {
      this.DisableNext = false;
    }
    if (this.PageNumber <= Math.ceil(this.store.worksCount() / this.PageSize)) {
      this.PageNumber++;
    }
  }
}
