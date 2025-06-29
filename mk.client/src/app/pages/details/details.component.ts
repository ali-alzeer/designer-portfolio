import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
} from '@angular/core';
import { LanguageStore } from '../../stores/languagestore';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.interface';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements DoCheck {
  languageService = inject(LanguageService);

  Language = Language.English;

  UI = {
    hello: 'hello',
  };

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI = {
        hello: 'مرحبا',
      };
    } else if (this.Language === 0) {
      this.UI = {
        hello: 'hello',
      };
    }
  }
}
