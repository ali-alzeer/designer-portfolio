import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
} from '@angular/core';
import { AdminStore } from '../../stores/adminstore';
import { AdminSigninDTO } from '../../models/adminsignindto';
import { FormAdminComponent } from '../../components/form-admin/form-admin.component';
import { CommonModule } from '@angular/common';
import { WarningComponent } from '../../components/warning/warning.component';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.interface';
import { WorksComponent } from '../../components/works/works.component';
import { FormAddWorkComponent } from '../../components/form-add-work/form-add-work.component';
import { FormUpdateWorkComponent } from '../../components/form-update-work/form-update-work.component';
import { WorksStore } from '../../stores/worksstore';
import { Work } from '../../models/works.interface';
import { WorkToUpdateStore } from '../../stores/worktoupdatestore';
import { FormAddToolComponent } from '../../components/form-add-tool/form-add-tool.component';
import { ToolsComponent } from '../../components/tools/tools.component';
import { ToolsStore } from '../../stores/toolsstore';
import { FormChangeAdminDataComponent } from '../../components/form-change-admin-data/form-change-admin-data.component';
import { FormUpdateMainimageComponent } from '../../components/form-update-mainimage/form-update-mainimage.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormAdminComponent,
    CommonModule,
    WarningComponent,
    WorksComponent,
    FormAddWorkComponent,
    FormUpdateWorkComponent,
    FormAddToolComponent,
    ToolsComponent,
    FormChangeAdminDataComponent,
    FormUpdateMainimageComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements DoCheck {
  worksStore = inject(WorksStore);
  toolsStore = inject(ToolsStore);
  adminStore = inject(AdminStore);
  languageService = inject(LanguageService);
  Language = Language.English;

  // workToUpdateStore = inject(WorkToUpdateStore);

  worksPage = true;
  toolsPage = false;
  accountPage = false;

  toolAdding = false;
  toolupdating = false;

  adding = false;
  // updating = false;
  deleting = false;

  changeAdminData = false;
  updateMainImage = false;

  UI = {
    welcome: 'Welcome',
    works: 'Your works',
    add: 'Add a new work',
    cancel: 'Cancel',
    update: 'Update a work',
    signout: 'Sign out',
    deleteok: 'Ok',
    deletecancel: 'Cancel',
    deleteMessage: 'Are you sure about deletion?',
    tools: 'Your tools',
    toolAdd: 'Add a new tool',
    changeData: 'Change account data',
    UpdateImage: 'Update main image',
    account: 'Your account',
  };

  ngDoCheck(): void {
    this.Language = this.languageService.language();
    if (this.Language === 1) {
      this.UI = {
        welcome: 'مرحباً بك',
        works: 'أعمالك',
        add: 'إضافة عمل جديد',
        cancel: 'إلغاء',
        update: 'تعديل عمل',
        signout: 'تسجيل خروج',
        deleteok: 'موافق',
        deletecancel: 'إلغاء',
        deleteMessage: 'هل أنت متأكد من الحذف؟',
        tools: 'أدواتك',
        toolAdd: 'إضافة أداة جديدة',
        changeData: 'تغيير بيانات الحساب',
        UpdateImage: 'تغيير الصورة الرئيسية',
        account: 'حسابك',
      };
    } else {
      this.UI = {
        welcome: 'Welcome',
        works: 'Your works',
        add: 'Add a new work',
        cancel: 'Cancel',
        update: 'Update a work',
        signout: 'Sign out',
        deleteok: 'Ok',
        deletecancel: 'Cancel',
        deleteMessage: 'Are you sure about deletion?',
        tools: 'Your tools',
        toolAdd: 'Add a new tool',
        changeData: 'Change account data',
        UpdateImage: 'Update main image',
        account: 'Your account',
      };
    }

    // this.updating = this.workToUpdateStore.work() !== null;
  }

  StartAdding() {
    this.adding = true;
  }

  CancelAdding() {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    this.adding = false;
  }

  StartToolAdding() {
    this.toolAdding = true;
  }

  CancelToolAdding() {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    this.toolAdding = false;
  }

  StartChangingData() {
    this.changeAdminData = true;
    this.updateMainImage = false;
  }

  CancelChangingData() {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    this.changeAdminData = false;
  }

  StartUpdatingImage() {
    this.updateMainImage = true;
    this.changeAdminData = false;
  }

  CancelUpdatingImage() {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    this.updateMainImage = false;
  }

  // StartUpdating() {
  //   this.updating = true;
  // }

  // CancelUpdating() {
  //   window.scrollTo({
  //     behavior: 'smooth',
  //     top: 0,
  //   });

  //   this.workToUpdateStore.RemoveWorkToUpdate();
  //   this.updating = false;
  // }

  SignOut() {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });

    this.adminStore.SignOut();
  }

  // StartUpdatingWork(work: Work) {
  //   this.StartUpdating();
  //   window.scrollTo({
  //     behavior: 'smooth',
  //     top: 0,
  //   });
  // }

  // StartDeletingWork(work: Work) {
  //   this.deleting = true;
  //   // this.worksStore.deleteWork(work.id);
  // }

  ShowWorksPage() {
    this.worksPage = true;
    this.toolsPage = false;
    this.accountPage = false;
  }

  ShowToolsPage() {
    this.worksPage = false;
    this.toolsPage = true;
    this.accountPage = false;
  }

  ShowAccountPage() {
    this.worksPage = false;
    this.toolsPage = false;
    this.accountPage = true;
  }
}
