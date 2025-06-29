import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASEURL } from '../../environment/environment';
import { Tool } from '../models/tool.interface';
import { ToolAddDTO } from '../models/ToolAddDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  http = inject(HttpClient);

  constructor() {}

  getTools() {
    return this.http.get<Tool[]>(`${BASEURL}/api/Tools/all`);
  }

  AddTool(toolAddDTO: ToolAddDTO) {
    return this.http.post<Tool>(`${BASEURL}/api/Tools/add`, toolAddDTO);
  }

  DeleteTool(id: number) {
    return this.http.delete(`${BASEURL}/api/Tools/delete/${id}`);
  }
}
