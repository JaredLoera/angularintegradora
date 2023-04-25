import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSensoresComponent } from './tabla-sensores.component';

describe('TablaSensoresComponent', () => {
  let component: TablaSensoresComponent;
  let fixture: ComponentFixture<TablaSensoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSensoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
