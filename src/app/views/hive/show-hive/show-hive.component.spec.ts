import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHiveComponent } from './show-hive.component';

describe('ShowHiveComponent', () => {
  let component: ShowHiveComponent;
  let fixture: ComponentFixture<ShowHiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
