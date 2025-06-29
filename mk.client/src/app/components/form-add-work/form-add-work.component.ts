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

@Component({
  selector: 'app-form-add-work',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TypeToggleComponent,
    LoadingComponent,
  ],
  templateUrl: './form-add-work.component.html',
  styleUrl: './form-add-work.component.css',
})
export class FormAddWorkComponent implements OnInit, DoCheck {
  Success = false;

  languageService = inject(LanguageService);
  mediaService = inject(MediaService);
  toolsStore = inject(ToolsStore);
  worksStore = inject(WorksStore);
  adminStore = inject(AdminStore);

  Language = Language.English;

  UI = {
    FormTitle: 'Adding a work',
    Media: 'Url',
    Title: 'Title',
    Description: 'Description',
    Type: 'Type',
    Tools: 'Tools',
    Save: 'Save',
    Reset: 'Reset',
    Signin: 'Adding a new work failed',
    SuccessText: 'Work was added successfully',
  };

  AddWorkForm!: FormGroup;

  @ViewChild('MediaUrl', { static: true }) MediaUrl!: ElementRef;
  @ViewChild('AddWorkButton', { static: true }) AddWorkButton!: ElementRef;

  EnterClick!: () => void;

  MediaType = 'image';
  toolsIds: number[] = [];

  // selectedFile: File | null = null;
  // previewUrl: string | ArrayBuffer | null = null;

  // FormFileToSend: FormData | null = null;

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   this.selectedFile = file;

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.previewUrl = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }

  //   const formData = new FormData();
  //   formData.append('image', file, file.name);
  //   this.FormFileToSend = formData;
  // }

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.AddWorkForm = this.formBuilder.group({
      MediaUrl: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      Title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      Description: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      Type: new FormControl('image'),
      ToolsIds: new FormControl([]),
    });

    this.EnterClick = this.renderer.listen(document, 'keydown', (event) => {
      if (event.key === 'Enter') {
        if (this.AddWorkForm.valid) {
          this.AddWorkButton.nativeElement.click();
        }
      }
    });
  }

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI = {
        FormTitle: 'إضافة عمل جديد',
        Media: 'الرابط',
        Title: 'العنوان',
        Description: 'الوصف',
        Type: 'النوع',
        Tools: 'الأدوات',
        Save: 'حفظ',
        Reset: 'مسح',
        Signin: 'فشلت إضافة العمل',
        SuccessText: 'نجحت إضافة العمل',
      };
    } else {
      this.UI = {
        FormTitle: 'Adding a work',
        Media: 'Url',
        Title: 'Title',
        Description: 'Description',
        Type: 'Type',
        Tools: 'Tools',
        Save: 'Save',
        Reset: 'Reset',
        Signin: 'Adding a new work failed',
        SuccessText: 'Work was added successfully',
      };
    }
  }

  async AddWork() {
    if (this.AddWorkForm.valid) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });

      try {
        this.AddWorkForm.controls['Type'].setValue(this.MediaType);
        this.AddWorkForm.controls['ToolsIds'].setValue(this.toolsIds);

        this.worksStore.SetLoadingTrue();

        let workDTO: WorkAddDTO = {
          title: this.AddWorkForm.controls['Title'].value,
          description: this.AddWorkForm.controls['Description'].value,
          publicWorkMediaUrl: this.AddWorkForm.controls['MediaUrl'].value,
          type: this.AddWorkForm.controls['Type'].value,
          toolsIds: this.AddWorkForm.controls['ToolsIds'].value,
        };

        let DatabaseResult: any = await firstValueFrom(
          this.worksStore.addWork(workDTO)
        ).then((res) => {
          return res;
        });

        this.Reset();

        this.Success = true;

        this.worksStore.SetLoadingFalse();
        this.worksStore.loadWorks();
      } catch (error) {
        this.worksStore.SetLoadingFalse();
        this.worksStore.SetErrorTrue('Error occured see the console');
        console.log(error);
      }
    }
  }

  Reset() {
    this.AddWorkForm.reset();
    this.MediaType = 'image';
    this.toolsIds = [];
  }

  ChangeTools(event: any) {
    if (event.target !== undefined) {
      if (event.target.checked) {
        this.toolsIds.push(Number(event.target.id));
      } else if (!event.target.checked) {
        this.toolsIds = this.toolsIds.filter(
          (id) => id !== Number(event.target.id)
        );
      }
    }
  }

  ChangeMediaTypeFromToggle(event: any) {
    if (event === 'image') {
      this.MediaType = 'image';
    } else if (event === 'video') {
      this.MediaType = 'video';
    }
  }

  ngOnDestroy(): void {
    this.EnterClick();
  }
}
