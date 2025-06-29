import { Component, DoCheck, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent implements DoCheck{

  faArrowDown = faArrowDown

  router = inject(Router)

  languageService = inject(LanguageService)

  Language = Language.English

  UI = {
    title : 'WARNING',
    info : 'This page is not for visitors, If you got here by mistake press the button to return to home page',
    button : 'Return to home page'
  }

  ngDoCheck(): void {
    this.Language = this.languageService.language()
    if(this.Language === 1){
      this.
      UI = {
        title : 'تحذير',
        info : 'هذه الصفحة ليست للزوار، إن أتيت هنا بالخطأ اضغط الزر للرجوع إلى الصفحة الرئيسية',
        button : 'العودة إلى الصفحة الرئيسية'
      }

    }
    else{
      this.
      UI = {
        title : 'WARNING',
        info : 'This page is not for visitors, If you got here by mistake press the button to return to home page',
        button : 'Return to home page'
      }

    }
  
  }

  Return() {
    this.router.navigateByUrl('');    
  }
      
}
