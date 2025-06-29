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

export interface WorkToUpdateState {
  work: Work | null;
}

export const WorkToUpdateStore = signalStore(
  { providedIn: 'root' },
  withState<WorkToUpdateState>({
    work: null,
  }),
  withMethods((store) => ({
    ChangeWorkToUpdate(work: Work) {
      patchState(store, { work: work });
    },
    RemoveWorkToUpdate() {
      patchState(store, { work: null });
    },
  }))
);
