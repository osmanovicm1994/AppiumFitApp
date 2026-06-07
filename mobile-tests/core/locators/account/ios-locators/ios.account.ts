import { $ } from '@wdio/globals';

export class IOSAccountLocators {

  get logOut() {
    return $('//XCUIElementTypeButton[@name="Logga ut"]');
  }

  get settingsButton() {
    return $('//XCUIElementTypeButton[@name="Inställningar"]');
  }

}