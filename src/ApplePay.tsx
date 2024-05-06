import {
  EventEmitter,
  requireNativeModule,
  Subscription,
} from "expo-modules-core";

import * as ApplePayTypes from "./ApplePay.type";

const applePay = requireNativeModule("ExpoTappayApplePay");

const emitter = new EventEmitter(applePay);

function removeListender(subscription: Subscription) {
  emitter.removeSubscription(subscription);
}

/* Receive Prime Listener */
function addReceivePrimeListener(
  listener: (payload: ApplePayTypes.OnReceivePrimeEvent) => void,
): Subscription {
  return emitter.addListener("onReceivePrime", listener);
}

/* Apple Pay Start Listener */
function addApplePayStartListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
) {
  return emitter.addListener("onApplePayStart", listener);
}

/* Apple Pay Cancel Listener */
function addApplePayCancelListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
) {
  return emitter.addListener("onApplePayCancel", listener);
}

/* Apple Pay Success Listener */
function addApplePaySuccessListener(
  listener: (payload: ApplePayTypes.OnApplePayTransactionEvent) => void,
) {
  return emitter.addListener("onApplePaySuccess", listener);
}

/* Apple Pay Failed Listener */
function addApplePayFailedListener(
  listener: (payload: ApplePayTypes.OnApplePayTransactionEvent) => void,
) {
  return emitter.addListener("onApplePayFailed", listener);
}

/* Apple Pay Finished Listener */
function addApplePayFinishedListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
) {
  return emitter.addListener("onApplePayFinished", listener);
}

function isApplePayAvailable(): boolean {
  return applePay.isApplePayAvailable();
}

const setupMerchant = (props: ApplePayTypes.MerchantOptions) => {
  applePay.setupMerchant(
    props.name,
    props.capabilities,
    props.merchantId,
    props.countryCode,
    props.currencyCode,
  );
};

const startApplePay = (props: ApplePayTypes.StartPaymentOptions) => {
  applePay.clearCart();
  props.cart.forEach((item) => {
    applePay.addToCart(item.name, item.amount);
  });
  applePay.startPayment();
};

const showResult = (isSuccess: boolean) => {
  applePay.showResult(isSuccess);
};

const showSetup = () => {
  applePay.showSetup();
};

export default {
  isApplePayAvailable,
  setupMerchant,
  startApplePay,
  showResult,
  showSetup,
  removeListender,
  addReceivePrimeListener,
  addApplePayStartListener,
  addApplePayCancelListener,
  addApplePaySuccessListener,
  addApplePayFailedListener,
  addApplePayFinishedListener,
};
