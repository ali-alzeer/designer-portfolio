import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksToShowComponent } from './works-to-show.component';

describe('WorksToShowComponent', () => {
  let component: WorksToShowComponent;
  let fixture: ComponentFixture<WorksToShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorksToShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksToShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
