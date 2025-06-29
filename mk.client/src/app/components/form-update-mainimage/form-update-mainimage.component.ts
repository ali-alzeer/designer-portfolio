import {
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
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageStore } from '../../stores/languagestore';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { AdminStore } from '../../stores/adminstore';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.interface';
import { LoadingComponent } from '../loading/loading.component';
import { AdminSigninDTO } from '../../models/adminsignindto';
import { MainImageUpdateDTO } from '../../models/MainImageUpdateDTO.interface';

@Component({
  selector: 'app-form-update-mainimage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form-update-mainimage.component.html',
  styleUrl: './form-update-mainimage.component.css',
})
export class FormUpdateMainimageComponent implements OnInit, DoCheck {
  languageService = inject(LanguageService);

  adminStore = inject(AdminStore);
  adminService = inject(AdminService);

  Language = Language.English;

  Success = false;

  UI = {
    Title: 'Updating Image',
    MainImageUrl: 'Url',
    Save: 'Save',
    Reset: 'Reset',
    SuccessText: 'Image was updated successfully',
  };

  UpdateMainImageForm!: FormGroup;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.UpdateMainImageForm = this.formBuilder.group({
      MainImageUrl: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI = {
        Title: 'تغيير الصورة',
        MainImageUrl: 'الرابط',
        Save: 'حفظ',
        Reset: 'مسح',
        SuccessText: 'نجح تغيير البيانات',
      };
    } else {
      this.UI = {
        Title: 'Updating Image',
        MainImageUrl: 'Url',
        Save: 'Save',
        Reset: 'Reset',
        SuccessText: 'Image was updated successfully',
      };
    }
  }

  UpdateMainImage() {
    let ConfirmChange = confirm('Are you sure about updating the image?');
    if (ConfirmChange) {
      if (this.UpdateMainImageForm.valid) {
        window.scrollTo({
          behavior: 'smooth',
          top: 0,
        });

        this.adminStore.SetLoadingTrue();
        try {
          let mainImageUrl: MainImageUpdateDTO = {
            MainImageUrl:
              this.UpdateMainImageForm.controls['MainImageUrl'].value,
          };

          this.adminService
            .UpdateMainImage(mainImageUrl)
            .subscribe((res: any) => {
              this.Success = true;
            });

          this.UpdateMainImageForm.reset();
        } catch (error) {
          console.log(error);
        } finally {
          this.adminStore.SetLoadingFalse();
        }
      }
    }
  }

  Reset() {
    this.UpdateMainImageForm.reset();
  }
}
