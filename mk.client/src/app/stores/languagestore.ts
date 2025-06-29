import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { Work } from '../models/works.interface'
import { computed, inject } from '@angular/core'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { catchError, delay, pipe, switchMap, tap, throwError } from 'rxjs'
import { WorksService } from '../services/works.service'
import { HttpErrorResponse } from '@angular/common/http'
import { AdminService } from '../services/admin.service'
import { AdminSigninDTO } from '../models/adminsignindto'
import { Admin } from '../models/admin.interface'
import { Language } from '../models/language.interface'

export interface LanguageState {
    language:Language
}

export const LanguageStore = signalStore(
    {providedIn: 'root'},
    withState<LanguageState>({
        language:Language.English
    }),
    withMethods((store) => ({
        InitLanguage(){
            localStorage.setItem('language', 'English')
        },
        SetLanguage(language: Language){
            patchState(store, {language:language})
            if(!localStorage.getItem("language")){
              if(language === 1){
                localStorage.setItem("language", "Arabic")
              }
              else{
                localStorage.setItem("language", "English")
              }
            }
            else{
              if(language === 1 && localStorage.getItem("language") === "English"){
                localStorage.setItem("language", "Arabic")
              }
              else if(language === 0 && localStorage.getItem("language") === "Arabic"){
                localStorage.setItem("language", "English")
              }
              else if(localStorage.getItem("language") !== "Arabic" && localStorage.getItem("language") !== "English"){
                localStorage.setItem("language", "English")
              } 
            }
        }
    })
    ),
    withHooks(
        {
            onInit(store){
                store.InitLanguage()
            }
        }
    )
)