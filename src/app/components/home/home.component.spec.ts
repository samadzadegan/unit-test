import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { findComponent } from '../../spec-helpers/element.spec-helper';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent counter', () => {
    expect(findComponent(fixture, 'app-counter')).toBeTruthy();
  });

  it('passes a start count', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter.properties.startCount).toBe(5);
  });

  it('listens for count change', () => {
    spyOn(console, 'log');
    const counter = findComponent(fixture, 'app-counter');
    counter.triggerEventHandler('countChange', 5);
    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      5
    );
  });

  it('renders a service counter', () => {
    expect(findComponent(fixture, 'app-service-counter')).toBeTruthy();
  });
});
