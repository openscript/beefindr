import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsModule } from '../../components/components.module';

import { StartPageComponent } from './start-page.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { AddHiveComponent } from '../hive/add-hive/add-hive.component';

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        RouterModule.forRoot(
          appRoutes
        ),
      ],
      declarations: [
        StartPageComponent,
        AddHiveComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
