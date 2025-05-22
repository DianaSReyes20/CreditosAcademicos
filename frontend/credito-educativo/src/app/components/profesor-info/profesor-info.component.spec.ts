import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorInfoComponent } from './profesor-info.component';

describe('ProfesorInfoComponent', () => {
  let component: ProfesorInfoComponent;
  let fixture: ComponentFixture<ProfesorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
