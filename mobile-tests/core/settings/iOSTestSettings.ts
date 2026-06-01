import type { Browser } from 'webdriverio';
import { TestSettings } from '../helpers/TestSettings';

export class IOSTestSettings extends TestSettings {

  constructor(driver: Browser) {
    super(driver);
  }

  async setEnvironmentNewDesign(environment: string): Promise<void> {

    console.log(`iOS environment: ${environment}`);

    // iOS-specific implementation
  }
}