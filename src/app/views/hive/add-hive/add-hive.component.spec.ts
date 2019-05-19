import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHiveComponent } from './add-hive.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddHiveComponent', () => {
  let component: AddHiveComponent;
  let fixture: ComponentFixture<AddHiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AddHiveComponent
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
