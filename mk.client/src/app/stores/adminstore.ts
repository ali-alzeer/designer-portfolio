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
import { catchError, delay, pipe, switchMap, tap, throwError } from 'rxjs';
import { WorksService } from '../services/works.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { AdminSigninDTO } from '../models/adminsignindto';
import { Admin } from '../models/admin.interface';

export interface AdminState {
  admin: Admin | null;
  isAdmin: boolean;
  error: string | null;
  isLoading: boolean;
}

export const AdminStore = signalStore(
  { providedIn: 'root' },
  withState<AdminState>({
    admin: null,
    isAdmin: false,
    error: null,
    isLoading: false,
  }),
  withMethods((store, adminService = inject(AdminService)) => ({
    GetAdminEmail() {
      return adminService.GetAdminEmail();
    },

    async LoadAdminData(): Promise<Admin | null> {
      return await adminService.LoadAdminData();
    },
    SetLoadingTrue() {
      patchState(store, { isLoading: true });
    },
    SetLoadingFalse() {
      patchState(store, { isLoading: false });
    },
    SignOut() {
      localStorage.removeItem('admin');
      patchState(store, { isAdmin: false, admin: null });
    },

    ChangeAdminData: rxMethod(
      pipe(
        switchMap((adminSigninDTO: AdminSigninDTO) => {
          return adminService.ChangeAdminData(adminSigninDTO).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, {
                admin: null,
                isAdmin: false,
                error: error.error,
                isLoading: false,
              });
              return throwError(error);
            }),
            tap((admin) => {
              patchState(store, {
                admin: admin,
                isAdmin: true,
                error: null,
                isLoading: false,
              });
              const adminInStorage = JSON.stringify(admin);
              localStorage.setItem('admin', adminInStorage);
            })
          );
        })
      )
    ),

    SignIn: rxMethod(
      pipe(
        switchMap((adminSigninDTO: AdminSigninDTO) => {
          return adminService.SignIn(adminSigninDTO).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, {
                admin: null,
                isAdmin: false,
                error: error.error,
                isLoading: false,
              });
              return throwError(error);
            }),
            tap((admin) => {
              patchState(store, {
                admin: admin,
                isAdmin: true,
                error: null,
                isLoading: false,
              });
              const adminInStorage = JSON.stringify(admin);
              localStorage.setItem('admin', adminInStorage);
            })
          );
        })
      )
    ),

    ValidateCode: rxMethod(
      pipe(
        switchMap((code: string) => {
          return adminService.ValidateCode(code).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, {
                admin: null,
                isAdmin: false,
                error: error.error,
                isLoading: false,
              });
              return throwError(error);
            }),
            tap((admin) => {
              patchState(store, {
                admin: admin,
                isAdmin: true,
                error: null,
                isLoading: false,
              });
              const adminInStorage = JSON.stringify(admin);
              localStorage.setItem('admin', adminInStorage);
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.LoadAdminData().then((admin) => {
        if (admin !== null && admin !== undefined) {
          patchState(store, {
            admin: admin,
            isAdmin: true,
            error: null,
            isLoading: false,
          });
        }
      });
    },
  })
);
