import type { Browser } from 'webdriverio';
import { TestSettings } from '../helpers/TestSettings';

export class AndroidTestSettings extends TestSettings {

  constructor(driver: Browser) {
    super(driver);
  }

  async setEnvironmentNewDesign(environment: string): Promise<void> {

    console.log(`Android environment: ${environment}`);

    // Android-specific implementation
  }
}