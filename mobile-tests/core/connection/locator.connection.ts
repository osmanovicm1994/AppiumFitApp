import { browser } from '@wdio/globals';

import { AndroidWelcomePageLocators } from '../locators/welcomePage/android.welcomePage';
import { IOSWelcomePageLocators } from '../locators/welcomePage/ios.welcomePage';

import { AndroidAccountLocators } from '../locators/account/android-locators/android.account';
import { IOSAccountLocators } from '../locators/account/ios-locators/ios.account';

export class LocatorFactory {

  static getWelcomePageLocators() {

    if (browser.isAndroid) {
      return new AndroidWelcomePageLocators();
    }

    return new IOSWelcomePageLocators();
  }

  static getAccountLocators() {

    if (browser.isAndroid) {
      return new AndroidAccountLocators();
    }

    return new IOSAccountLocators();
  }

}