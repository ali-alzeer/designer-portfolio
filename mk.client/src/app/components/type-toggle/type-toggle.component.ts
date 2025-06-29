import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Language } from '../../models/language.interface';
import { LanguageStore } from '../../stores/languagestore';
import { LanguageService } from '../../services/language.service';
import { WorkToUpdateStore } from '../../stores/worktoupdatestore';

@Component({
  selector: 'app-type-toggle',
  standalone: true,
  imports: [],
  templateUrl: './type-toggle.component.html',
  styleUrl: './type-toggle.component.css',
})
export class TypeToggleComponent implements DoCheck {
  // languageStore = inject(LanguageStore)
  languageService = inject(LanguageService);
  workToUpdateStore = inject(WorkToUpdateStore);

  Value = 'Image';

  UI = {
    ImageText: 'Image',
    VideoText: 'Video',
  };

  // Language = this.languageStore.language()
  Language = Language.English;

  @ViewChild('TypeInput', { static: true }) TypeInput!: ElementRef;

  @Output() ChangeMediaType = new EventEmitter<string>();

  ngOnInit() {
    if (this.workToUpdateStore.work() !== null) {
      if (this.workToUpdateStore.work()?.type === 'image') {
        this.TypeInput.nativeElement.checked = false;
      } else if (this.workToUpdateStore.work()?.type === 'video') {
        this.TypeInput.nativeElement.checked = true;
      }
    }
  }

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI.ImageText = 'صورة';
      this.UI.VideoText = 'فيديو';
    } else {
      this.UI.ImageText = 'Image';
      this.UI.VideoText = 'Video';
    }

    if (this.TypeInput.nativeElement.checked) {
      this.Value = 'Video';
    } else if (!this.TypeInput.nativeElement.checked) {
      this.Value = 'Image';
    }
  }

  OnTypeChange() {
    if (this.TypeInput.nativeElement.checked) {
      this.Value = 'Video';
      this.ChangeMediaType.emit('video');
    } else if (!this.TypeInput.nativeElement.checked) {
      this.Value = 'Image';
      this.ChangeMediaType.emit('image');
    }
  }
}
