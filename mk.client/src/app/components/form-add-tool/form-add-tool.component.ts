import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValueChangeEvent,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { LanguageStore } from '../../stores/languagestore';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { AdminStore } from '../../stores/adminstore';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.interface';
import { Tool } from '../../models/tool.interface';
import { TypeToggleComponent } from '../type-toggle/type-toggle.component';
import { fileRequiredValidator } from '../../validators/file.validator';
import { ToolsStore } from '../../stores/toolsstore';
import { WorksStore } from '../../stores/worksstore';
import { catchError, firstValueFrom, map, pipe } from 'rxjs';
import { WorkAddDTO } from '../../models/WorkAddDTO.interface';
import { LoadingComponent } from '../loading/loading.component';
import { MediaService } from '../../services/media.service';
import { ToolAddDTO } from '../../models/ToolAddDTO.interface';

@Component({
  selector: 'app-form-add-tool',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TypeToggleComponent,
    LoadingComponent,
  ],
  templateUrl: './form-add-tool.component.html',
  styleUrl: './form-add-tool.component.css',
})
export class FormAddToolComponent implements OnInit, DoCheck, OnDestroy {
  Success = false;

  languageService = inject(LanguageService);
  toolsStore = inject(ToolsStore);
  adminStore = inject(AdminStore);

  Language = Language.English;

  UI = {
    FormTitle: 'Adding a tool',
    Media: 'Url',
    Title: 'Title',
    Description: 'Description',
    Save: 'Save',
    Reset: 'Reset',
    SuccessText: 'Tool was added successfully',
  };

  AddToolForm!: FormGroup;

  @ViewChild('MediaUrl', { static: true }) MediaUrl!: ElementRef;
  @ViewChild('AddToolButton', { static: true }) AddToolButton!: ElementRef;

  EnterClick!: () => void;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.AddToolForm = this.formBuilder.group({
      MediaUrl: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      Title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });

    this.EnterClick = this.renderer.listen(document, 'keydown', (event) => {
      if (event.key === 'Enter') {
        if (this.AddToolForm.valid) {
          this.AddToolButton.nativeElement.click();
        }
      }
    });
  }

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI = {
        FormTitle: 'إضافة أداة جديدة',
        Media: 'الرابط',
        Title: 'العنوان',
        Description: 'الوصف',
        Save: 'حفظ',
        Reset: 'مسح',
        SuccessText: 'نجحت إضافة الأداة',
      };
    } else {
      this.UI = {
        FormTitle: 'Adding a tool',
        Media: 'Url',
        Title: 'Title',
        Description: 'Description',
        Save: 'Save',
        Reset: 'Reset',
        SuccessText: 'Tool was added successfully',
      };
    }
  }

  async AddTool() {
    if (this.AddToolForm.valid) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });

      try {
        this.toolsStore.SetLoadingTrue();

        let toolDTO: ToolAddDTO = {
          title: this.AddToolForm.controls['Title'].value,
          publicToolImageUrl: this.AddToolForm.controls['MediaUrl'].value,
        };

        let DatabaseResult: any = await firstValueFrom(
          this.toolsStore.addTool(toolDTO)
        ).then((res) => {
          return res;
        });

        this.AddToolForm.reset();

        this.Success = true;

        this.toolsStore.SetLoadingFalse();
        this.toolsStore.loadTools();
      } catch (error) {
        this.toolsStore.SetLoadingFalse();
        this.toolsStore.SetErrorTrue('Error occured see the console');
        console.log(error);
      }
    }
  }

  Reset() {
    this.AddToolForm.reset();
  }

  ngOnDestroy(): void {
    this.EnterClick();
  }
}
