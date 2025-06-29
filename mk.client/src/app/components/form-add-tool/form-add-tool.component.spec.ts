import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddToolComponent } from './form-add-tool.component';

describe('FormAddToolComponent', () => {
  let component: FormAddToolComponent;
  let fixture: ComponentFixture<FormAddToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
