import { $ } from '@wdio/globals';

export class AndroidAccountLocators {

  get logOut() {
    return $('//android.view.View[@resource-id="logoutRow"]');
  }

  get settingsButton() {
    return $('id=settingsButton');
  }

}