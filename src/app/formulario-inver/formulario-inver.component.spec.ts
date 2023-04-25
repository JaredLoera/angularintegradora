import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInverComponent } from './formulario-inver.component';

describe('FormularioInverComponent', () => {
  let component: FormularioInverComponent;
  let fixture: ComponentFixture<FormularioInverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioInverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioInverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
