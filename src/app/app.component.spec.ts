import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ComponentsModule } from './components/components.module';
import { StartPageComponent } from './views/start-page/start-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddHiveComponent } from './views/hive/add-hive/add-hive.component';
import { RegisterUserComponent } from './views/user/register-user/register-user.component';
import { ShowHiveComponent } from './views/hive/show-hive/show-hive.component';
import { LoginUserComponent } from './views/user/login-user/login-user.component';
import { DashboardUserComponent } from './views/user/dashboard-user/dashboard-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
      ],
      declarations: [
        AppComponent,
        StartPageComponent,
        AddHiveComponent,
        RegisterUserComponent,
        ShowHiveComponent,
        RegisterUserComponent,
        LoginUserComponent,
        DashboardUserComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

/*
  it(`should have as title 'beefinder'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('beefinder');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to beefinder!');
  }); */
});
