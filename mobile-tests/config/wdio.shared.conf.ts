import type { Options } from '@wdio/types'

export const sharedConfig: Partial<Options.Testrunner> = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  specs: ['./tests/specs/**/*.spec.ts'],
  exclude: [],

  // Max parallel browser instances per capability
  maxInstances: 1,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,  // 60 seconds per test
  },

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
    }],
  ],

  // Global hooks
  beforeTest: async function (test, context) {
    // runs before each test
  },
  afterTest: async function (test, context, { error }) {
    if (error) {
      await driver.takeScreenshot()
    }
  },
}