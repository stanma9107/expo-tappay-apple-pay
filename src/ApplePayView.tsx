import { requireNativeViewManager } from "expo-modules-core";
import { PureComponent, createRef } from "react";
import { ViewProps } from "react-native";
const NativeView = requireNativeViewManager("ExpoTappayApplePay");

interface onReceivePrimeEvent {
  prime: string;
  expiryMillis: number;
  totalAmount: number;
  clientIP: string;
}

interface onFailedEvent {
  message: string;
  code: number;
}

interface onSuccessEvent {
  totalAmount: number;
}

type ReceivePrimeEventType = {
  nativeEvent: onReceivePrimeEvent;
};

type FailedEventType = {
  nativeEvent: onFailedEvent;
};

type SuccessEventType = {
  nativeEvent: onSuccessEvent;
};

type ApplePayProps = ViewProps & {
  onApplePayStart?: () => void;
  onApplePayCancel?: () => void;
  onApplePaySuccess?: (event: onSuccessEvent) => void;
  onReceivePrime?: (event: onReceivePrimeEvent) => void;
  onApplePayFailed?: (event: onFailedEvent) => void;
  onApplePayFinished?: () => void;
};

export type ReceivePrimeCallback = (params: onReceivePrimeEvent) => void;
export type FailedCallback = (params: onFailedEvent) => void;
export type SuccessCallback = (params: onSuccessEvent) => void;

export default class ApplePayView extends PureComponent<ApplePayProps> {
  nativeRef = createRef<any>();

  onReceivePrimeCallback =
    (callback?: ReceivePrimeCallback) =>
    ({ nativeEvent }: ReceivePrimeEventType) => {
      if (callback) {
        callback(nativeEvent);
      }
    };

  onFailedCallback =
    (callback?: FailedCallback) =>
    ({ nativeEvent }: FailedEventType) => {
      if (callback) {
        callback(nativeEvent);
      }
    };

  onSuccessCallback =
    (callback?: SuccessCallback) =>
    ({ nativeEvent }: SuccessEventType) => {
      if (callback) {
        callback(nativeEvent);
      }
    };

  setupMerchant = (
    name: string,
    capability: string,
    merchantIdentifier: string,
    countryCode: string,
    currencyCode: string,
  ) => {
    this.nativeRef.current?.setupMerchant(
      name,
      capability,
      merchantIdentifier,
      countryCode,
      currencyCode,
    );
  };

  addItemToCart = (name: string, amount: number) => {
    this.nativeRef.current?.addItemToCart(name, amount);
  };

  render() {
    return (
      <NativeView
        {...this.props}
        style={[
          this.props.style,
          {
            aspectRatio: 4,
          },
        ]}
        onApplePayStart={this.props.onApplePayStart}
        onApplePayCancel={this.props.onApplePayCancel}
        onApplePayFinished={this.props.onApplePayFinished}
        onReceivePrime={this.onReceivePrimeCallback(this.props.onReceivePrime)}
        onFailed={this.onFailedCallback(this.props.onApplePayFailed)}
        onApplePaySuccess={this.onSuccessCallback(this.props.onApplePaySuccess)}
        ref={this.nativeRef}
      />
    );
  }
}
