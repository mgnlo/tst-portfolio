import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RwdWebsiteComponent } from './rwd-website.component';

describe('RwdWebsiteComponent', () => {
  let component: RwdWebsiteComponent;
  let fixture: ComponentFixture<RwdWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RwdWebsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RwdWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
