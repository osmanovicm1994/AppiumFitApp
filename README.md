# AppiumFitApp

A scalable mobile automation framework built with **WebdriverIO (v8+)**, **TypeScript**, and **Appium**. This project implements a strict cross-platform **Page Object Model (POM)** design pattern to cleanly isolate selectors and actions for both Android and iOS applications.

---

## 🏗️ Project Architecture

The architecture separates platform-specific locators from execution logic, allowing a single page object test step to work across both Android and iOS apps.

```text
mobile-tests/
├── core/
│   ├── connection/       # Appium/Driver connectivity management
│   ├── helpers/          # Common test utilities & custom explicit waits
│   ├── locators/         # Platform-specific selectors
│   │   ├── account/
│   │   │   ├── android.account.ts
│   │   │   └── ios.account.ts
│   │   └── welcomePage/
│   │       ├── android.welcomePage.ts
│   │       └── ios.welcomePage.ts
│   ├── pages/            # Page Objects interacting with isolated locators
│   │   ├── account.page.ts
│   │   └── welcome.page.ts
│   └── setup/            # Orchestration for multi-device/parallel execution
└── wdio.conf.ts          # Core WebdriverIO and Appium configuration
