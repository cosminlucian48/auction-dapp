import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftBoxComponent } from './nft-box.component';

describe('NftBoxComponent', () => {
  let component: NftBoxComponent;
  let fixture: ComponentFixture<NftBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
