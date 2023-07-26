import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

/**
 * Finds an element inside the Component by the given `data-test-id` attribute.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 *
 */
export function findEl<T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement {
  return fixture.debugElement.query(By.css(`[data-test-id="${testId}"]`));
}

/**
 * Emulates a left click on the element with the given `data-test-id` attribute.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-test-id`
 */
export function click<T>(fixture: ComponentFixture<T>, testId: string): void {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}

/**
 * Makes a fake click event that provides the most important properties.
 * Sets the button to left.
 * The event can be passed to DebugElement#triggerEventHandler.
 *
 * @param target Element that is the target of the click event
 */
export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
  };
}

/**
 * Expects the element with the given testId
 * has the given text content.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-test-id`
 * @param text Expected text
 */
export function expectText<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  text: string
): void {
  const element = findEl(fixture, testId);
  expect(element.nativeElement.textContent).toBe(text);
}

export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string
): void {
  const resetInputEl = findEl(fixture, testId).nativeElement;
  resetInputEl.value = value;
  resetInputEl.dispatchEvent(new Event('input'));
}
