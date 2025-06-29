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

@Component({
  selector: 'app-form-change-admin-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form-change-admin-data.component.html',
  styleUrl: './form-change-admin-data.component.css',
})
export class FormChangeAdminDataComponent implements OnInit, DoCheck {
  languageService = inject(LanguageService);

  adminStore = inject(AdminStore);

  Language = Language.English;

  Success = false;

  UI = {
    Title: 'Changing data',
    Username: 'Username',
    Email: 'Email',
    Password: 'Password',
    Save: 'Save',
    Reset: 'Reset',
    Show: 'Show',
    Hide: 'Hide',
    SuccessText: 'Data was changed successfully',
  };

  ChangeAdminDataForm!: FormGroup;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ChangeAdminDataForm = this.formBuilder.group({
      Username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      Password2: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI = {
        Title: 'تغيير البيانات',
        Username: 'اسم المستخدم',
        Email: 'البريد الإلكتروني',
        Password: 'كلمة السر',
        Save: 'حفظ',
        Reset: 'مسح',
        Show: 'إظهار',
        Hide: 'إخفاء',
        SuccessText: 'نجح تغيير البيانات',
      };
    } else {
      this.UI = {
        Title: 'Changing data',
        Username: 'Username',
        Email: 'Email',
        Password: 'Password',
        Save: 'Save',
        Reset: 'Reset',
        Show: 'Show',
        Hide: 'Hide',
        SuccessText: 'Data was changed successfully',
      };
    }
  }

  ChangeAdminData() {
    let ConfirmChange = confirm('Are you sure about changing the data?');
    if (ConfirmChange) {
      if (this.ChangeAdminDataForm.valid) {
        window.scrollTo({
          behavior: 'smooth',
          top: 0,
        });

        this.adminStore.SetLoadingTrue();
        try {
          let adminDTO: AdminSigninDTO = {
            username: this.ChangeAdminDataForm.controls['Username'].value,
            email: this.ChangeAdminDataForm.controls['Email'].value,
            password: this.ChangeAdminDataForm.controls['Password2'].value,
          };

          this.adminStore.ChangeAdminData(adminDTO);
          this.Success = true;
          this.ChangeAdminDataForm.reset();
        } catch (error) {
          console.log(error);
        } finally {
          this.adminStore.SetLoadingFalse();
        }
      }
    }
  }

  Reset() {
    this.ChangeAdminDataForm.reset();
  }
}
