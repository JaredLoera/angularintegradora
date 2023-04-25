import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInverComponent } from './tabla-inver.component';

describe('TablaInverComponent', () => {
  let component: TablaInverComponent;
  let fixture: ComponentFixture<TablaInverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaInverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
