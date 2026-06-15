import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Motivos } from './motivos';

describe('Motivos', () => {
  let component: Motivos;
  let fixture: ComponentFixture<Motivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Motivos],
    }).compileComponents();

    fixture = TestBed.createComponent(Motivos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
