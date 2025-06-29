import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddWorkComponent } from './form-add-work.component';

describe('FormAddWorkComponent', () => {
  let component: FormAddWorkComponent;
  let fixture: ComponentFixture<FormAddWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
