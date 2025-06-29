import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
  OnInit,
} from '@angular/core';
import { WorksComponent } from '../../components/works/works.component';
import { WorksToShowComponent } from '../../components/works-to-show/works-to-show.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faYoutube,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowDown,
  faHouse,
  faInfo,
  faImages,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.interface';
import { CommonModule } from '@angular/common';
import { AdminStore } from '../../stores/adminstore';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    WorksComponent,
    WorksToShowComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, DoCheck {
  faYoutube = faYoutube;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faArrowDown = faArrowDown;
  faHouse = faHouse;
  faInfo = faInfo;
  faImages = faImages;
  faEnvelope = faEnvelope;

  languageService = inject(LanguageService);
  language = Language.English;

  adminStore = inject(AdminStore);
  adminService = inject(AdminService);

  adminEmail: string | undefined = undefined;
  adminImage: string | undefined = undefined;

  UI = {
    HOME: 'HOME',
    ABOUT: 'ABOUT',
    GALLERY: 'GALLERY',
    CONTACT: 'CONTACT',
  };
  ngOnInit(): void {
    this.adminStore.GetAdminEmail().subscribe(
      (res: any) => {
        this.adminEmail = res.email;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    this.adminService.GetMainImage().subscribe(
      (res: any) => {
        this.adminImage = res.mainImageUrl;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  ngDoCheck(): void {
    this.language = this.languageService.language();

    if (this.language === 1) {
      this.UI = {
        HOME: 'الرئيسية',
        ABOUT: 'حول',
        GALLERY: 'المعرض',
        CONTACT: 'التواصل',
      };
    } else if (this.language === 0) {
      this.UI = {
        HOME: 'HOME',
        ABOUT: 'ABOUT',
        GALLERY: 'GALLERY',
        CONTACT: 'CONTACT',
      };
    }
  }

  HOME() {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  }
}
