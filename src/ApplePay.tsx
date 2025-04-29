import { EventSubscription, UnavailabilityError } from "expo-modules-core";

import * as ApplePayTypes from "./ApplePay.type";
import ExpoTappayApplePay from "./ExpoApplePay";

/* Receive Prime Listener */
function addReceivePrimeListener(
  listener: (payload: ApplePayTypes.OnReceivePrimeEvent) => void,
): EventSubscription {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  return ExpoTappayApplePay.addListener("onReceivePrime", listener);
}

/* Apple Pay Start Listener */
function addApplePayStartListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
) {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  return ExpoTappayApplePay.addListener("onApplePayStart", listener);
}

/* Apple Pay Cancel Listener */
function addApplePayCancelListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
) {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  return ExpoTappayApplePay.addListener("onApplePayCancel", listener);
}

/* Apple Pay Success Listener */
function addApplePaySuccessListener(
  listener: (payload: ApplePayTypes.OnApplePayTransactionEvent) => void,
) {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  return ExpoTappayApplePay.addListener("onApplePaySuccess", listener);
}

/* Apple Pay Failed Listener */
function addApplePayFailedListener(
  listener: (payload: ApplePayTypes.OnApplePayTransactionEvent) => void,
) {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  return ExpoTappayApplePay.addListener("onApplePayFailed", listener);
}

/* Apple Pay Finished Listener */
function addApplePayFinishedListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
) {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  return ExpoTappayApplePay.addListener("onApplePayFinished", listener);
}

function isApplePayAvailable(): boolean {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  return ExpoTappayApplePay.isApplePayAvailable();
}

const setupMerchant = (props: ApplePayTypes.MerchantOptions) => {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  ExpoTappayApplePay.setupMerchant(
    props.name,
    props.capabilities,
    props.merchantId,
    props.countryCode,
    props.currencyCode,
  );
};

const startApplePay = (props: ApplePayTypes.StartPaymentOptions) => {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  ExpoTappayApplePay.clearCart();
  props.cart.forEach((item) => {
    ExpoTappayApplePay.addToCart(item.name, item.amount);
  });
  ExpoTappayApplePay.startPayment();
};

const showResult = (isSuccess: boolean) => {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  ExpoTappayApplePay.showResult(isSuccess);
};

const showSetup = () => {
  if (!ExpoTappayApplePay || !ExpoTappayApplePay.isApplePayAvailable()) {
    throw new UnavailabilityError(
      "expo-tappay-apple-pay",
      "addReceivePrimeListener",
    );
  }
  ExpoTappayApplePay.showSetup();
};

export default {
  isApplePayAvailable,
  setupMerchant,
  startApplePay,
  showResult,
  showSetup,
  addReceivePrimeListener,
  addApplePayStartListener,
  addApplePayCancelListener,
  addApplePaySuccessListener,
  addApplePayFailedListener,
  addApplePayFinishedListener,
};
