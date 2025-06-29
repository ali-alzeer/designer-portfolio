import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
import { catchError, firstValueFrom } from 'rxjs';
import { WorkUpdateDTO } from '../../models/WorkUpdateDTO.interface';
import { LoadingComponent } from '../loading/loading.component';
import { MediaService } from '../../services/media.service';
import { Work } from '../../models/works.interface';
import { WorkToUpdateStore } from '../../stores/worktoupdatestore';

@Component({
  selector: 'app-form-update-work',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TypeToggleComponent,
    LoadingComponent,
  ],
  templateUrl: './form-update-work.component.html',
  styleUrl: './form-update-work.component.css',
})
export class FormUpdateWorkComponent implements OnInit, DoCheck, AfterViewInit {
  @Output() SetUpdatingFalse = new EventEmitter<boolean>();

  workToUpdateStore = inject(WorkToUpdateStore);

  WorkToUpdate = this.workToUpdateStore.work();

  Success = false;

  languageService = inject(LanguageService);
  mediaService = inject(MediaService);
  toolsStore = inject(ToolsStore);
  worksStore = inject(WorksStore);
  adminStore = inject(AdminStore);

  Language = Language.English;

  UI = {
    FormTitle: 'Updating a work',
    Media: 'Url',
    Title: 'Title',
    Description: 'Description',
    Type: 'Type',
    Tools: 'Tools',
    Save: 'Save',
    Reset: 'Reset',
    Signin: 'Updateing a new work failed',
    SuccessText: 'Work was added successfully',
  };

  UpdateWorkForm!: FormGroup;

  @ViewChild('MediaUrl', { static: true }) MediaUrl!: ElementRef;
  @ViewChild('UpdateWorkButton', { static: true })
  UpdateWorkButton!: ElementRef;

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
    this.UpdateWorkForm = this.formBuilder.group({
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
        this.UpdateWorkButton.nativeElement.click();
      }
    });
  }

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI = {
        FormTitle: 'تعديل عمل',
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
        FormTitle: 'Updating a work',
        Media: 'Url',
        Title: 'Title',
        Description: 'Description',
        Type: 'Type',
        Tools: 'Tools',
        Save: 'Save',
        Reset: 'Reset',
        Signin: 'Updateing a new work failed',
        SuccessText: 'Work was added successfully',
      };
    }
  }

  ngAfterViewInit(): void {
    if (this.WorkToUpdate !== null) {
      this.UpdateWorkForm.controls['MediaUrl'].setValue(
        this.WorkToUpdate.publicWorkMediaUrl
      );
      this.UpdateWorkForm.controls['Title'].setValue(this.WorkToUpdate.title);
      this.UpdateWorkForm.controls['Description'].setValue(
        this.WorkToUpdate.description
      );
      this.UpdateWorkForm.controls['Type'].setValue(this.WorkToUpdate.type);
      this.MediaType = this.WorkToUpdate.type;
      if (
        this.WorkToUpdate.toolsIds !== undefined &&
        this.WorkToUpdate.toolsIds.length > 0
      ) {
        this.UpdateWorkForm.controls['ToolsIds'].setValue(
          this.WorkToUpdate.toolsIds
        );
        this.toolsIds = this.WorkToUpdate.toolsIds;
        for (let i = 0; i < this.toolsStore.toolsIds().length; i++) {
          if (
            this.WorkToUpdate.toolsIds.includes(this.toolsStore.toolsIds()[i])
          ) {
            let input = document.getElementById(
              `${this.toolsStore.toolsIds()[i]}`
            );

            if (input !== null && input instanceof HTMLInputElement) {
              input.checked = true;
            }
          }
        }
      }
    }
  }

  async UpdateWork() {
    if (this.UpdateWorkForm.valid && this.WorkToUpdate !== null) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });

      try {
        this.UpdateWorkForm.controls['Type'].setValue(this.MediaType);
        this.UpdateWorkForm.controls['ToolsIds'].setValue(this.toolsIds);

        this.worksStore.SetLoadingTrue();

        let workDTO: WorkUpdateDTO = {
          id: this.WorkToUpdate.id,
          title: this.UpdateWorkForm.controls['Title'].value,
          description: this.UpdateWorkForm.controls['Description'].value,
          publicWorkMediaUrl: this.UpdateWorkForm.controls['MediaUrl'].value,
          type: this.UpdateWorkForm.controls['Type'].value,
          toolsIds: this.UpdateWorkForm.controls['ToolsIds'].value,
        };

        this.worksStore.updateWork(workDTO);

        this.UpdateWorkForm.reset();

        this.Success = true;

        this.worksStore.SetLoadingFalse();
        this.worksStore.loadWorks();
        // this.workToUpdateStore.RemoveWorkToUpdate();
      } catch (error) {
        this.worksStore.SetLoadingFalse();
        this.worksStore.SetErrorTrue('Error occured see the console');
        throw error;
      }
    }
  }

  Reset() {
    this.UpdateWorkForm.reset();
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
