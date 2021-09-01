import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoipComponent } from './geoip.component';

describe('GeoipComponent', () => {
  let component: GeoipComponent;
  let fixture: ComponentFixture<GeoipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
