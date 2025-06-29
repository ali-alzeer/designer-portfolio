import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateWorkComponent } from './form-update-work.component';

describe('FormUpdateWorkComponent', () => {
  let component: FormUpdateWorkComponent;
  let fixture: ComponentFixture<FormUpdateWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
