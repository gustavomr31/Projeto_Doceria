import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrinhos } from './carrinhos';

describe('Carrinhos', () => {
  let component: Carrinhos;
  let fixture: ComponentFixture<Carrinhos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrinhos],
    }).compileComponents();

    fixture = TestBed.createComponent(Carrinhos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
