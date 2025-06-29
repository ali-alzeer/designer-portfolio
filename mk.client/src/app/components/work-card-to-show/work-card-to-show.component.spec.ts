import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardToShowComponent } from './work-card-to-show.component';

describe('WorkCardToShowComponent', () => {
  let component: WorkCardToShowComponent;
  let fixture: ComponentFixture<WorkCardToShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCardToShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardToShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
