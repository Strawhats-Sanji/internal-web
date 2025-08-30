import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsPageComponent } from './returns-page';

describe('ReturnsPage', () => {
  let component: ReturnsPageComponent;
  let fixture: ComponentFixture<ReturnsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
