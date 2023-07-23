import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    // *********************************************************************
    // const { debugElement } = fixture;
    // const { nativeElement } = debugElement;
    // console.log('debug element ', debugElement);
    // console.log('native element ', nativeElement);
    // console.log(nativeElement.tagName);
    // console.log(nativeElement.textContent);
    // console.log(nativeElement.innerHTML);
    // *********************************************************************
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('increments the count', () => {
    const incrementButton = debugElement.query(
      By.css('[data-test-id="increment-button"]')
    );
    incrementButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    const countOutput = debugElement.query(By.css('[data-test-id="count"]'));
    expect(countOutput.nativeElement.textContent).toBe('1');
    // component.increment();
    // expect(component.count).toBe(1);
  });

  it('decrements the count', () => {
    const decrementButton = debugElement.query(
      By.css('[data-test-id="decrement-button"]')
    );
    decrementButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    const countOutput = debugElement.query(By.css('[data-test-id="count"]'));
    expect(countOutput.nativeElement.textContent).toBe('-1');
  });
});
