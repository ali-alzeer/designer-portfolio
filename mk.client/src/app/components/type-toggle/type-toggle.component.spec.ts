import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeToggleComponent } from './type-toggle.component';

describe('TypeToggleComponent', () => {
  let component: TypeToggleComponent;
  let fixture: ComponentFixture<TypeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
