import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { DebugElement } from '@angular/core';
import {
  click,
  expectText,
  setFieldValue,
} from '../../spec-helpers/element.spec-helper';
import { take, toArray } from 'rxjs/operators';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;
  const startCount = 0;

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
    component.startCount = startCount;
    component.ngOnChanges();
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', String(startCount));
  });

  // it('emits countChange events on increment', () => {
  //   let actualCount: number | undefined;
  //   component.countChange.subscribe((count: number) => {
  //     actualCount = count;
  //   });
  //
  //   click(fixture, 'increment-button');
  //
  //   expect(actualCount).toBe(1);
  // });
  //
  // it('emits countChange events on decrement', () => {
  //   let actualCount: number | undefined;
  //   component.countChange.subscribe((count: number) => {
  //     actualCount = count;
  //   });
  //
  //   click(fixture, 'decrement-button');
  //
  //   expect(actualCount).toBe(-1);
  // });
  //
  // it('emits countChange events on reset', () => {
  //   const newCount = '777';
  //   let actualCount: number | undefined;
  //   component.countChange.subscribe((count: number) => {
  //     actualCount = count;
  //   });
  //
  //   setFieldValue(fixture, 'reset-input', newCount);
  //   click(fixture, 'reset-button');
  //
  //   expect(actualCount).toBe(+newCount);
  // });

  // *********************************** Combine all tree specs of countChange events ***********************************
  it('emits countChange events', () => {
    const newCount = '777';
    let actualCount: number[] | undefined;
    component.countChange
      .pipe(take(3), toArray())
      .subscribe((count: number[]) => {
        actualCount = count;
      });

    click(fixture, 'increment-button');
    click(fixture, 'decrement-button');
    setFieldValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');

    expect(actualCount).toEqual([1, 0, +newCount]);
  });

  it('increments the count', () => {
    // ACT
    click(fixture, 'increment-button');
    // RE-RENDER
    fixture.detectChanges();
    // ASSERT
    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    // ACT
    click(fixture, 'decrement-button');
    // RE-RENDER
    fixture.detectChanges();
    // ASSERT
    expectText(fixture, 'count', '-1');
  });

  it('reset the count', () => {
    const newCount = '123';
    // ACT
    setFieldValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    // RE-RENDER
    fixture.detectChanges();
    // ASSERT
    expectText(fixture, 'count', newCount);
  });

  it('does not reset if the value is not a number', () => {
    const newCount = 'not a number';
    // ACT
    setFieldValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    // RE-RENDER
    fixture.detectChanges();
    // ASSERT
    expectText(fixture, 'count', '0');
  });
});
