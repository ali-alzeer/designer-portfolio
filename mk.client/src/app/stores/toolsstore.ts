import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Tool } from '../models/tool.interface';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, delay, pipe, switchMap, tap, throwError } from 'rxjs';
import { ToolsService } from '../services/tools.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToolAddDTO } from '../models/ToolAddDTO.interface';

export interface ToolsState {
  tools: Tool[];
  error: string | null;
  isLoading: boolean;
}

export const ToolsStore = signalStore(
  { providedIn: 'root' },
  withState<ToolsState>({
    tools: [],
    error: null,
    isLoading: false,
  }),
  withComputed((store) => ({
    toolsCount: computed(() => store.tools().length),
    toolsIds: computed(() => {
      return store.tools().map((t) => t.id);
    }),
  })),
  withMethods((store, toolService = inject(ToolsService)) => ({
    GetToolsForWork(ToolsIds: number[]) {
      let ToolsForWork: Tool[] = [];

      for (let i = 0; i < ToolsIds.length; i++) {
        ToolsForWork.push(this.GetToolByToolId(ToolsIds[i])[0]);
      }
      return ToolsForWork;
    },
    GetToolByToolId(ToolId: number) {
      return store.tools().filter((t) => t.id === ToolId);
    },

    addTool(toolAddDTO: ToolAddDTO) {
      return toolService.AddTool(toolAddDTO);
    },

    deleteTool(Id: number) {
      return toolService.DeleteTool(Id);
    },

    SetLoadingTrue() {
      patchState(store, { isLoading: true });
    },

    SetLoadingFalse() {
      patchState(store, { isLoading: false });
    },

    SetErrorTrue(error: string) {
      patchState(store, { error: error });
    },

    loadTools: rxMethod<void>(
      pipe(
        switchMap(() => {
          return toolService.getTools().pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, { error: error.error.error, isLoading: false });
              return throwError(error);
            }),
            tap((tools) => {
              patchState(store, {
                tools: tools,
                error: null,
                isLoading: false,
              });
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      patchState(store, { error: null, isLoading: true });
      store.loadTools();
    },
  })
);
