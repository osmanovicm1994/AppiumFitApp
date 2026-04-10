import { sharedConfig } from './wdio.shared.conf'

export const config = {
  ...sharedConfig,
  hostname: '127.0.0.1',
  port: 4723,
  services: ['appium'],
  capabilities: [{
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:platformVersion': '18.0',
    'appium:deviceName': 'iPhone 16 Pro',
    'appium:app': `${process.cwd()}/apps/MyApp.app`,
    'appium:noReset': false,
    'appium:newCommandTimeout': 240,
  }],
}