import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangeAdminDataComponent } from './form-change-admin-data.component';

describe('FormChangeAdminDataComponent', () => {
  let component: FormChangeAdminDataComponent;
  let fixture: ComponentFixture<FormChangeAdminDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormChangeAdminDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChangeAdminDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
