import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCreateNftComponent } from './pop-up-create-nft.component';

describe('PopUpCreateNftComponent', () => {
  let component: PopUpCreateNftComponent;
  let fixture: ComponentFixture<PopUpCreateNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCreateNftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpCreateNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
