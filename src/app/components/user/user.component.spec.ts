import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UserComponent } from './user.component';
import {UserService} from "../../services/user/user.service";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj<UserService>(['getUser']);
    userServiceSpy.getUser.and.callFake(function () {
      return of({
        results: [
          {
            name: {
              title: 'Mr',
              first: 'Peter',
              last: 'Parker'
            },
            dob: {
              age: 25
            },
            picture: {
              thumbnail: 'test'
            }
          }
        ]
      });
    });
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy
        }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    console.log(fixture.debugElement);
    expect(component).toBeTruthy();

    expect(fixture.debugElement.query(By.css('#wrapper'))).toBeTruthy();

    expect(fixture.debugElement.query(By.css('#userName'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#userName')).nativeElement.textContent).toBe('Peter Parker');
  }));
});
