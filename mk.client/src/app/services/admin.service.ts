import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AdminSigninDTO } from '../models/adminsignindto';
import { Admin } from '../models/admin.interface';
import { catchError, firstValueFrom, Observable, of, throwError } from 'rxjs';
import { BASEURL } from '../../environment/environment';
import { MainImageDTO } from '../models/MainImageDTO.interface';
import { MainImageUpdateDTO } from '../models/MainImageUpdateDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = inject(HttpClient);

  constructor() {}

  SignIn(adminSigninDTO: AdminSigninDTO) {
    return this.http.post<Admin>(`${BASEURL}/api/Auth/signin`, adminSigninDTO);
  }

  ValidateCode(code: string) {
    return this.http.get<Admin>(`${BASEURL}/api/Auth/validate-code/${code}`);
  }

  GetAdminEmail() {
    return this.http.get<string>(`${BASEURL}/api/Auth/admin-email`);
  }
  ChangeAdminData(adminSigninDTO: AdminSigninDTO) {
    return this.http.post<Admin>(
      `${BASEURL}/api/Auth/change-admin-data`,
      adminSigninDTO
    );
  }

  GetMainImage() {
    return this.http.get<MainImageDTO>(`${BASEURL}/api/Auth/admin-image`);
  }

  UpdateMainImage(mainImageUpdateDTO: MainImageUpdateDTO) {
    return this.http.post(
      `${BASEURL}/api/Auth/update-mainimage`,
      mainImageUpdateDTO
    );
  }

  async LoadAdminData(): Promise<Admin | null> {
    const adminFromStorage = localStorage.getItem('admin');
    if (adminFromStorage !== null) {
      const admin = JSON.parse(adminFromStorage);

      if (
        admin !== undefined &&
        admin.token !== undefined &&
        admin.id !== undefined &&
        admin.username !== undefined &&
        admin.email !== undefined &&
        admin.createdOn !== undefined &&
        admin.updatedOn !== undefined &&
        admin.lastLoggingIn !== undefined
      ) {
        const headers = new HttpHeaders().set('token', admin.token);

        const validToken = await firstValueFrom(
          this.http.get<boolean>(`${BASEURL}/api/Auth/validate-token`, {
            headers: headers,
          })
        ).catch((error) => {
          return false;
        });

        if (validToken) {
          return admin;
        } else {
          localStorage.removeItem('admin');
          return null;
        }
      } else {
        localStorage.removeItem('admin');
        return null;
      }
    } else {
      return null;
    }
  }
}
