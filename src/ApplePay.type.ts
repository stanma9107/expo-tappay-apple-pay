export type Capability = "debit" | "credit" | "emv" | "3DS";

export interface CartItem {
  name: string;
  amount: number;
}

export interface MerchantOptions {
  name: string;
  capabilities: Capability;
  merchantId: string;
  countryCode: string;
  currencyCode: string;
}

export interface StartPaymentOptions {
  cart: CartItem[];
}

interface OnSuccessReceivePrimeEvent {
  success: true;
  prime: string;
  expiryMillis: number;
  totalAmount: number;
  clientIP: string;
}

interface OnFailureReceivePrimeEvent {
  success: false;
  message: string;
}

export type OnApplePayGeneralEvent = {
  status: number;
  message: string;
};

export type OnApplePayTransactionEvent = {
  status: number;
  amount: number;
  message: string;
  description: string;
};

export type OnReceivePrimeEvent =
  | OnSuccessReceivePrimeEvent
  | OnFailureReceivePrimeEvent;

export type ApplePayEventName =
  | "onApplePayStart"
  | "onApplePayCancel"
  | "onApplePaySuccess"
  | "onReceivePrime"
  | "onApplePayFailed"
  | "onApplePayFinished";
