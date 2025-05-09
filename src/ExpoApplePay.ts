import { requireNativeModule } from "expo-modules-core";
import { NativeModule } from "react-native";

export default requireNativeModule("ExpoTappayApplePay") ||
  // If the real native module doesn't exist, make a pretend one, instead of
  // `null`, so we can offer an `isApplePayAvailable` (that will always give
  // `false`, because we're on an unsupported platform).
  ({
    isApplePayAvailable(): boolean {
      return false;
    },

    // RN v0.65 gives a console warning if this method is missing; see
    //   https://github.com/facebook/react-native/commit/114be1d21
    addListener() {
      // Nothing to do; unsupported platform.
      return Promise.resolve();
    },

    // RN v0.65 gives a console warning if this method is missing; see
    //   https://github.com/facebook/react-native/commit/114be1d21
    removeListeners() {
      // Nothing to do; unsupported platform.
      return Promise.resolve();
    },
  } as NativeModule);
