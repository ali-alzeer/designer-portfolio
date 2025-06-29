import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { WorksStore } from '../../stores/worksstore';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../services/media.service';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faImage,
  faVideo,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.interface';
import { ToolsStore } from '../../stores/toolsstore';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    YouTubePlayer,
    YouTubePlayerModule,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnInit, DoCheck {
  worksStore = inject(WorksStore);
  toolsStore = inject(ToolsStore);
  mediaService = inject(MediaService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  languageService = inject(LanguageService);

  language = Language.English;

  currentIndex = 0;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  ImageNotFound = false;

  faImage = faImage;
  faVideo = faVideo;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  DisableNext = false;
  UI = {
    title: 'TITLE',
    description: 'DESCRIPTION',
    tools: 'TOOLS',
  };

  ngOnInit(): void {
    if (this.route.paramMap !== undefined && this.route.paramMap !== null) {
      this.route.params.subscribe((p) => {
        // console.log(p['id']);
        if (isNaN(Number(p['id'])) || Number(p['id']) < 0) {
          this.router.navigateByUrl('');
        } else {
          this.currentIndex = Number(p['id']);
        }
      });
    }

    if (this.windowWidth > 1920) {
      this.windowWidth = 1920;
    }
  }

  ngDoCheck(): void {
    this.language = this.languageService.language();

    if (this.language === 1) {
      this.UI = {
        title: 'العنوان',
        description: 'الوصف',
        tools: 'الأدوات',
      };
    } else if (this.language === 0) {
      this.UI = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        tools: 'TOOLS',
      };
    }

    if (this.currentIndex === this.worksStore.worksCount() - 1) {
      this.DisableNext = true;
    } else {
      this.DisableNext = false;
    }
  }

  PrevoiusWork() {
    if (this.currentIndex !== 0) {
      this.currentIndex--;
      this.router.navigateByUrl(`details/${this.currentIndex}`);
    }
  }

  NextWork() {
    if (this.currentIndex === this.worksStore.worksCount() - 1) {
      this.DisableNext = true;
    } else {
      this.DisableNext = false;
    }
    if (this.currentIndex !== this.worksStore.worksCount() - 1) {
      this.currentIndex++;
      this.router.navigateByUrl(`details/${this.currentIndex}`);
    }
  }
}
