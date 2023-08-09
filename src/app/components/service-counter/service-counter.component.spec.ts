import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCounterComponent } from './service-counter.component';

describe('ServiceCounterComponent', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent]
    });
    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
