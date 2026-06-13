import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCard } from './school-card';

describe('SchoolCard', () => {
  let component: SchoolCard;
  let fixture: ComponentFixture<SchoolCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
