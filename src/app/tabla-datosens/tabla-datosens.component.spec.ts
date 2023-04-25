import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDatosensComponent } from './tabla-datosens.component';

describe('TablaDatosensComponent', () => {
  let component: TablaDatosensComponent;
  let fixture: ComponentFixture<TablaDatosensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDatosensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDatosensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
