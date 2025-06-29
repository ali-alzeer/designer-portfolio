import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Work } from '../models/works.interface';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  catchError,
  delay,
  firstValueFrom,
  pipe,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { WorksService } from '../services/works.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkAddDTO } from '../models/WorkAddDTO.interface';
import { WorkUpdateDTO } from '../models/WorkUpdateDTO.interface';
import { Settings } from '../models/settings.interface';

export interface WorksState {
  works: Work[];
  error: string | null;
  isLoading: boolean;
}

export const WorksStore = signalStore(
  { providedIn: 'root' },
  withState<WorksState>({
    works: [],
    error: null,
    isLoading: false,
  }),
  withComputed((store) => ({
    worksCount: computed(() => store.works().length),
  })),
  withMethods((store, workService = inject(WorksService)) => ({
    addWork(workAddDTO: WorkAddDTO) {
      return workService.AddWork(workAddDTO);
    },

    updateWork(workUpdateDTO: WorkUpdateDTO) {
      return workService.UpdateWork(workUpdateDTO);
    },

    deleteWork(Id: number) {
      return workService.DeleteWork(Id);
    },

    // addMedia(media : FormData, type: string){
    //     return workService.AddMedia(media, type)

    // },

    loadWorks: rxMethod<void>(
      pipe(
        switchMap(() => {
          return workService.getWorks().pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, { error: error.error.error, isLoading: false });
              return throwError(error);
            }),
            tap((works) => {
              patchState(store, {
                works: works,
                error: null,
                isLoading: false,
              });
            })
          );
        })
      )
    ),
    loadWorksByPage: rxMethod(
      pipe(
        switchMap((PageSettings: Settings) => {
          return workService
            .getWorksByPage(PageSettings.PageNumber, PageSettings.PageSize)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                patchState(store, {
                  error: error.error.error,
                  isLoading: false,
                });
                return throwError(error);
              }),
              tap((works) => {
                patchState(store, {
                  works: works,
                  error: null,
                  isLoading: false,
                });
              })
            );
        })
      )
    ),

    SetLoadingTrue() {
      patchState(store, { isLoading: true });
    },

    SetLoadingFalse() {
      patchState(store, { isLoading: false });
    },

    SetErrorTrue(error: string) {
      patchState(store, { error: error });
    },
  })),
  withHooks({
    onInit(store) {
      patchState(store, { error: null, isLoading: true });
      store.loadWorks();
    },
  })
);
