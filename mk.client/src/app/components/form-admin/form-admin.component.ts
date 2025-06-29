import {
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
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-admin.component.html',
  styleUrl: './form-admin.component.css',
})
export class FormAdminComponent implements OnInit, DoCheck, OnDestroy {
  codeField = false;

  // languageStore = inject(LanguageStore);
  languageService = inject(LanguageService);

  adminStore = inject(AdminStore);
  adminService = inject(AdminService);

  Language = Language.English;

  @ViewChild('Password', { static: true }) Password!: ElementRef;
  @ViewChild('SigninButton', { static: true })
  SigninButton!: ElementRef<HTMLButtonElement>;

  UI = {
    Title: 'Sign in',
    Username: 'Username',
    Email: 'Email',
    Password: 'Password',
    Save: 'Sign in',
    Reset: 'Reset',
    Show: 'Show',
    Hide: 'Hide',
    Signin: 'Sign in failed',
    Forgot: 'Forgot account data',
    code: 'Code',
    validateCode: 'Validate code',
  };
  ShowPasswordText!: string;

  SigninForm!: FormGroup;
  CodeForm!: FormGroup;
  EnterClick!: () => void;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.SigninForm = this.formBuilder.group({
      Username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
    this.Password.nativeElement.type = 'password';

    this.EnterClick = this.renderer.listen(document, 'keydown', (event) => {
      if (event.key === 'Enter') {
        this.SigninButton.nativeElement.click();
      }
    });

    this.CodeForm = this.formBuilder.group({
      Code: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI = {
        Title: 'تسجيل دخول',
        Username: 'اسم المستخدم',
        Email: 'البريد الإلكتروني',
        Password: 'كلمة السر',
        Save: 'تسجيل الدخول',
        Reset: 'مسح',
        Show: 'إظهار',
        Hide: 'إخفاء',
        Signin: 'فشل تسجيل الدخول',
        Forgot: 'نسيت بيانات الحساب',
        code: 'الرمز',
        validateCode: 'تحقق من الرمز',
      };
    } else {
      this.UI = {
        Title: 'Sign in',
        Username: 'Username',
        Email: 'Email',
        Password: 'Password',
        Save: 'Sign in',
        Reset: 'Reset',
        Show: 'Show',
        Hide: 'Hide',
        Signin: 'Sign in failed',
        Forgot: 'Forgot account data',
        code: 'Code',
        validateCode: 'Validate code',
      };
    }

    if (this.Password.nativeElement.type === 'password') {
      this.ShowPasswordText = this.UI.Show;
    } else if (this.Password.nativeElement.type === 'text') {
      this.ShowPasswordText = this.UI.Hide;
    }
  }
  Signin() {
    if (this.SigninForm.valid) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });

      try {
        this.adminStore.SetLoadingTrue();
        this.adminStore.SignIn(this.SigninForm.getRawValue());
      } catch {
      } finally {
        this.adminStore.SetLoadingFalse();
      }
    }
  }

  Reset() {
    this.SigninForm.reset();
  }

  ShowPassword() {
    if (this.Password.nativeElement.type === 'password') {
      this.Password.nativeElement.type = 'text';
      this.ShowPasswordText = this.UI.Hide;
    } else if (this.Password.nativeElement.type === 'text') {
      this.Password.nativeElement.type = 'password';
      this.ShowPasswordText = this.UI.Show;
    }
  }

  // SendEmail() {
  //   try {
  //     let value = firstValueFrom(this.adminService.SendEmail());
  //     alert('We have sent you an email, Check your inbox');
  //   } catch (error) {
  //     alert('Error occurred, see the console');
  //   }
  // }

  ShowCodeField() {
    this.codeField = true;
  }

  ValidateCode() {
    if (this.CodeForm.valid) {
      this.adminStore.ValidateCode(this.CodeForm.controls['Code'].value);
    }
  }

  ngOnDestroy(): void {
    this.EnterClick();
  }
}
