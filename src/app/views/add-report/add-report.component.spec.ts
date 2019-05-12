import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportComponent } from './add-report.component';
import { ComponentsModule } from 'src/app/components/components.module';

describe('AddReportComponent', () => {
  let component: AddReportComponent;
  let fixture: ComponentFixture<AddReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule
      ],
      declarations: [
        AddReportComponent
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
