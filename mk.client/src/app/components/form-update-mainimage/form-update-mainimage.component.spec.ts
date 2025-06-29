import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateMainimageComponent } from './form-update-mainimage.component';

describe('FormUpdateMainimageComponent', () => {
  let component: FormUpdateMainimageComponent;
  let fixture: ComponentFixture<FormUpdateMainimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateMainimageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateMainimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
