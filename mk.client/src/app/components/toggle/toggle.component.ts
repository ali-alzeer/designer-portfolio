import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Language } from '../../models/language.interface';
import { LanguageStore } from '../../stores/languagestore';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css',
})
export class ToggleComponent {

  // languageStore = inject(LanguageStore)
  languageService = inject(LanguageService)

  UI = {
    LanguageText : "English"
  }

  // Language = this.languageStore.language()
  Language = Language.English

  @ViewChild("LanguageInput") LanguageInput !: ElementRef

  ngOnInit(){
  }
  
  ngDoCheck(): void {
    if(localStorage.getItem("language")){
      if(localStorage.getItem("language") === "English"){
        this.languageService.SetLanguage(Language.English)    
        this.UI.LanguageText = "English"
      }
      else if(localStorage.getItem("language") === "Arabic"){
        this.languageService.SetLanguage(Language.Arabic)    
        this.UI.LanguageText = "العربية"
      }
      else{
        this.languageService.SetLanguage(Language.English)    
        this.UI.LanguageText = "English"
      }
    }
    else{
      if(this.Language === 1){
        this.UI.LanguageText = "العربية"
      }
      else{
        this.UI.LanguageText = "English"
      }
    }
    
  }

  ngAfterViewInit(){
    if(localStorage.getItem("language")){
      if(localStorage.getItem("language") === "English"){
        this.LanguageInput.nativeElement.checked = false
      }
      else if(localStorage.getItem("language") === "Arabic"){
        this.LanguageInput.nativeElement.checked = true
      }
      else{
        this.LanguageInput.nativeElement.checked = false
      }
    }
  }

  OnLanguageChange() {
    if(this.LanguageInput.nativeElement.checked){
      this.languageService.SetLanguage(Language.Arabic)    
    }
    else if(!this.LanguageInput.nativeElement.checked){
      this.languageService.SetLanguage(Language.English)    
    }
  }  

}
