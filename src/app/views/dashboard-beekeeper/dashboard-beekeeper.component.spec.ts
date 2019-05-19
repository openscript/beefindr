import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBeekeeperComponent } from './dashboard-beekeeper.component';

describe('DashboardBeekeeperComponent', () => {
  let component: DashboardBeekeeperComponent;
  let fixture: ComponentFixture<DashboardBeekeeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBeekeeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBeekeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
