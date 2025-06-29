import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { WorksComponent } from './components/works/works.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { WindowStore } from './stores/windowstore';
import {
  faEnvelope,
  faHouse,
  faImages,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LanguageService } from './services/language.service';
import { Language } from './models/language.interface';
import { routerOptions } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterOutlet,
    PostsComponent,
    WorksComponent,
    ToggleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, DoCheck, OnDestroy {
  faHouse = faHouse;
  faInfo = faInfo;
  faImages = faImages;
  faEnvelope = faEnvelope;

  windowStore = inject(WindowStore);
  renderer = inject(Renderer2);
  languageService = inject(LanguageService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  language = Language.English;

  Load!: () => void;
  ResizeWindow!: () => void;

  ngOnInit(): void {
    this.Load = this.renderer.listen('window', 'load', () => {
      this.windowStore.ChangeWidth();
    });
    this.ResizeWindow = this.renderer.listen('window', 'resize', () => {
      this.windowStore.ChangeWidth();
    });
  }

  ngDoCheck(): void {}

  ngOnDestroy(): void {
    this.Load();
    this.ResizeWindow();
  }

  GoToHome() {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    this.router.navigateByUrl('');
  }
}
