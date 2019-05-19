import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHiveComponent } from './show-hive.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ShowHiveComponent', () => {
  let component: ShowHiveComponent;
  let fixture: ComponentFixture<ShowHiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        ShowHiveComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
