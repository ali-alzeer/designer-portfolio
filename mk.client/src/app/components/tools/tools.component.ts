import { Component, inject } from '@angular/core';
import { WorksStore } from '../../stores/worksstore';
import { ToolsStore } from '../../stores/toolsstore';
import { ToolCardComponent } from '../tool-card/tool-card.component';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [ToolCardComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css',
})
export class ToolsComponent {
  store = inject(ToolsStore);
}
