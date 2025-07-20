import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsPage } from './returns-page';

describe('ReturnsPage', () => {
  let component: ReturnsPage;
  let fixture: ComponentFixture<ReturnsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
