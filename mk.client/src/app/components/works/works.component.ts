import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { WorksStore } from '../../stores/worksstore';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WorksService } from '../../services/works.service';
import { CommonModule } from '@angular/common';
import { YouTubePlayer } from '@angular/youtube-player';
import { ToolsStore } from '../../stores/toolsstore';
import { WorkCardComponent } from '../work-card/work-card.component';
import { Work } from '../../models/works.interface';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    YouTubePlayer,
    ReactiveFormsModule,
    CommonModule,
    WorkCardComponent,
  ],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorksComponent {
  store = inject(WorksStore);
  toolsStore = inject(ToolsStore);
}
