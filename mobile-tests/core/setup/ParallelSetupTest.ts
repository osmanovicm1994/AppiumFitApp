import { remote, Browser } from 'webdriverio';
import dotenv from 'dotenv';

// Helpers
import { GeneralHelpers } from '../helpers/GeneralHelpers';
import { TestSettings } from '../helpers/TestSettings';

dotenv.config();

/**
 * Simple platform helper (NO browser dependency)
 * Works correctly with manually created Appium driver
 */
class Platform {
    static isAndroid(driver: Browser): boolean {
    return driver.capabilities.platformName === 'Android';
    }

    static isIOS(driver: Browser): boolean {
    return driver.capabilities.platformName === 'iOS';
    }

    static name(driver: Browser): string {
    return driver.capabilities.platformName as string;
    }
}

    export class ParallelSetupTest {

    public static driver: Browser;
    public static appConfiguration: string;

    protected configApp: string;
    protected device: string;

    // BrowserStack
    private static username = process.env.BROWSERSTACK_USERNAME;
    private static password = process.env.BROWSERSTACK_ACCESS_KEY;

    // iOS devices

    private static udidIphoneSim17 = process.env.UDID_IPHONE_SIM_15;
    private static platformSim17 = process.env.PLATFORM_VERSION_SIM_15;
    private static deviceNameIphoneSim17 = process.env.DEVICE_NAME_IPHONE_SIM_15;

    private static udidIphoneSim17ProMax = process.env.UDID_IPHONE_SIM_15_PRO_MAX;
    private static platformSim17ProMax = process.env.PLATFORM_VERSION_SIM_15_PRO_MAX;
    private static deviceNameIphoneSim17ProMax = process.env.DEVICE_NAME_IPHONE_SIM_15_PRO_MAX;

    // Android
    private static deviceNameAndroidSimuPixel6 = process.env.DEVICE_NAME_ANDROID_SIM_PIXEL6;
    private static appPathAndroid = process.env.APP_PATH_ANDROID;

    // Environment
    private static env = GeneralHelpers.getAppConfig('environment');
    private static bundle_id = process.env.BUNDLE_ID;

    constructor(configApp: string, device: string) {
    this.configApp = configApp;
    this.device = device;
    }

    public async initDriver(): Promise<void> {

    ParallelSetupTest.appConfiguration = this.configApp;

    const environment =
        ParallelSetupTest.env.charAt(0).toUpperCase() +
        ParallelSetupTest.env.slice(1);

    switch (this.configApp) {

      // =====================================================
      // ANDROID PIXEL 9 SIMULATOR
      // =====================================================
        case 'androidSimulatorPixel9': {

        const options = {
            hostname: 'localhost',
            port: 4723,
            path: '/',

            capabilities: {
            platformName: 'Android',
            'appium:deviceName': 'Pixel 9',
            'appium:automationName': 'UiAutomator2',
            'appium:app': ParallelSetupTest.appPathAndroid,
            'appium:appPackage': ParallelSetupTest.bundle_id,
            'appium:appActivity': 'com.something.ui.launch.LaunchActivity', 
            /* 
            You can discover it with:
            adb shell dumpsys window | grep mCurrentFocus
            or
            adb shell cmd package resolve-activity --brief com.winter.FitApp
            */
            'appium:disableIdLocatorAutocompletion': true,
            'appium:adbExecTimeout': 40000
            }
        };

        ParallelSetupTest.driver = await remote(options);

        await ParallelSetupTest.driver.activateApp('se.icabanken.test');

        await ParallelSetupTest.driver.setTimeout({ implicit: 10000 });

        // Example usage of Platform helper
        if (Platform.isAndroid(ParallelSetupTest.driver)) {
            console.log('Android session started');
        }

        TestSettings
            .createInstance(ParallelSetupTest.driver)
            .setEnvironmentNewDesign(environment);

        break;
    }

      // =====================================================
      // IOS SIMULATOR 17
      // =====================================================
    case 'iosSimulator17': {

        const options = {
            hostname: 'localhost',
            port: 4723,
            path: '/',

            capabilities: {
            platformName: 'iOS',
            'appium:automationName': 'XCUITest',
            'appium:deviceName': ParallelSetupTest.deviceNameIphoneSim17,
            'appium:udid': ParallelSetupTest.udidIphoneSim17,
            'appium:platformVersion': ParallelSetupTest.platformSim17,
            'appium:bundleId': ParallelSetupTest.bundle_id,
            'appium:noReset': true,
            'appium:newCommandTimeout': 240
            }
        };

        ParallelSetupTest.driver = await remote(options);

        // activate app (optional if bundleId already launches it)
        await ParallelSetupTest.driver.activateApp('com.winter.FitApp');

        await ParallelSetupTest.driver.setTimeout({
            implicit: 10000
        });

        TestSettings
            .createInstance(ParallelSetupTest.driver)
            .setEnvironmentNewDesign(environment);

        break;
        }
        

      // =====================================================
      // IOS SIMULATOR 15 PRO MAX
      // =====================================================
        case 'iosSimulator17ProMax': {

        const options = {
            hostname: 'localhost',
            port: 4723,
            path: '/',

        capabilities: {
            platformName: 'iOS',
            'appium:automationName': 'XCUITest',
            'appium:deviceName': ParallelSetupTest.deviceNameIphoneSim17ProMax,
            'appium:platformVersion': ParallelSetupTest.platformSim17ProMax,
            'appium:udid': ParallelSetupTest.udidIphoneSim17ProMax,
            'appium:bundleId': ParallelSetupTest.bundle_id,
            'appium:noReset': true,
            'appium:newCommandTimeout': 240
            }
        };

        ParallelSetupTest.driver = await remote(options);

        await ParallelSetupTest.driver.activateApp('com.winter.FitApp');

        await ParallelSetupTest.driver.setTimeout({ implicit: 10000 });

        if (Platform.isIOS(ParallelSetupTest.driver)) {
            console.log('iOS 15 Pro Max session started');
        }

        TestSettings
            .createInstance(ParallelSetupTest.driver)
            .setEnvironmentNewDesign(environment);

        break;
        }

        default:
            throw new Error(`Unsupported configuration: ${this.configApp}`);
        }
    }

    public static async quitDriver(): Promise<void> {
    if (ParallelSetupTest.driver) {
        await ParallelSetupTest.driver.deleteSession();
        }
    }
}