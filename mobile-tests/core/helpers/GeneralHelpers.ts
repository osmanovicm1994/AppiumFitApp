export class GeneralHelpers {

  static getAppConfig(key: string): string {
    return process.env[key] ?? '';
  }

}