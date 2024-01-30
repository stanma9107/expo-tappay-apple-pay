// Import the native module. On web, it will be resolved to ExpoTappayApplePay.web.ts
// and on native platforms to ExpoTappayApplePay.ts
import ExpoTappayApplePayModule from "./ExpoTappayApplePayModule";

export function hello(): string {
  return ExpoTappayApplePayModule.hello();
}
