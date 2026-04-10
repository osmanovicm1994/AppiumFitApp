import { sharedConfig } from './wdio.shared.conf'

export const config = {
  ...sharedConfig,
  hostname: '127.0.0.1',
  port: 4723,
  services: ['appium'],
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:platformVersion': '15.0',
    'appium:deviceName': 'emulator-5554',
    'appium:app': `${process.cwd()}/apps/MyApp.apk`,
    'appium:appPackage': 'com.myapp.android',
    'appium:appActivity': 'com.myapp.MainActivity',
    'appium:noReset': false,
    'appium:newCommandTimeout': 240,
  }],
}