import type { Browser } from 'webdriverio';
import { AndroidTestSettings } from '../settings/AndroidTestSettings';
import { IOSTestSettings } from '../settings/iOSTestSettings';

export abstract class TestSettings {

  constructor(protected driver: Browser) {}

  abstract setEnvironmentNewDesign(environment: string): Promise<void>;

  static createInstance(driver: Browser): TestSettings {

    const platform =
      String(driver.capabilities.platformName).toLowerCase();

    if (platform.includes('android')) {
      return new AndroidTestSettings(driver);
    }

    if (platform.includes('ios')) {
      return new IOSTestSettings(driver);
    }

    throw new Error(`Unsupported platform: ${platform}`);
  }
}