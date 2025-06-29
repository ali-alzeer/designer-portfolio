import { computed, Injectable, signal } from '@angular/core';
import { Language } from '../models/language.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _language = signal<Language>(Language.English)
  public language = computed(this._language);

  GetLanguage(){
    return this.language();
  }

  SetLanguage(NewLanguage : Language){
    this._language.set(NewLanguage);

    if(!localStorage.getItem("language")){
      if(this._language() === 1){
        localStorage.setItem("language", "Arabic")
      }
      else{
        localStorage.setItem("language", "English")
      }
    }
    else{
      if(this._language() === 1 && localStorage.getItem("language") === "English"){
        localStorage.setItem("language", "Arabic")
      }
      else if(this._language() === 0 && localStorage.getItem("language") === "Arabic"){
        localStorage.setItem("language", "English")
      }
      else if(localStorage.getItem("language") !== "Arabic" && localStorage.getItem("language") !== "English"){
        localStorage.setItem("language", "English")
      } 
    }
  }


}
