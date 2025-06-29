import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Work } from '../models/works.interface';
import { WorkAddDTO } from '../models/WorkAddDTO.interface';
import { BASEURL } from '../../environment/environment';
import { WorkUpdateDTO } from '../models/WorkUpdateDTO.interface';
import { Settings } from '../models/settings.interface';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  http = inject(HttpClient);

  constructor() {}

  // getWorks(): Observable<any> {
  //   const works = [
  //     {id : '1', title: "one"},
  //     {id : '2', title: "two"},
  //     {id : '3', title: "three"},
  //   ];
  //   return of(works).pipe(delay(2000))
  // }

  getWorks() {
    return this.http.get<Work[]>(`${BASEURL}/api/Works/all`);
  }

  getWorksByPage(PageNumber: number, PageSize: number) {
    return this.http.get<Work[]>(
      `${BASEURL}/api/Works/page?PageNumber=${PageNumber}&PageSize=${PageSize}`
    );
  }

  AddWork(workAddDTO: WorkAddDTO) {
    return this.http.post(`${BASEURL}/api/Works/add`, workAddDTO);
  }

  UpdateWork(workUpdateDTO: WorkUpdateDTO) {
    return this.http.post(`${BASEURL}/api/Works/update`, workUpdateDTO);
  }

  DeleteWork(Id: number) {
    return this.http.delete(`${BASEURL}/api/Works/delete/${Id}`);
  }

  GetDefaultSettings() {
    let pageSettings: Settings = { PageNumber: 1, PageSize: 10 };
    return pageSettings;
  }

  // AddMedia(media: FormData, type: string) {
  //   if (type === 'image') {
  //     return this.http.post(`${BASEURL}/api/Media/add/image`, media);
  //   } else {
  //     return this.http.post(`${BASEURL}/api/Media/add/video`, media);
  //   }
  // }
}
