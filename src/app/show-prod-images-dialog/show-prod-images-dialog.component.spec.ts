import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProdImagesDialogComponent } from './show-prod-images-dialog.component';

describe('ShowProdImagesDialogComponent', () => {
  let component: ShowProdImagesDialogComponent;
  let fixture: ComponentFixture<ShowProdImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProdImagesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProdImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
