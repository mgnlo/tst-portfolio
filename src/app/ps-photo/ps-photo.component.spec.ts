import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsPhotoComponent } from './ps-photo.component';

describe('PsPhotoComponent', () => {
  let component: PsPhotoComponent;
  let fixture: ComponentFixture<PsPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
