# Expo Tappay - Apple Pay 
## Installation
```bash
npx expo install expo-tappay-apple-pay
```
## Prerequisites
- Please create a Tappay account and get the app ID from [Tappay Dashboard](https://accounts.tappaysdk.com/).
- Create Merchant ID and Apple Pay Certificate from [Apple Developer](https://developer.apple.com/account/resources/identifiers/list/merchant).
- Integrate your Merchant with Tappay Dashboard.
- Please add the following config in your app.json
```json
{
  "expo": {
    "plugins": [
      [
        "expo-tappay-apple-pay", {
          "merchantId": "YOUR_MERCHANT_ID", // replace with your Merchant ID
          "acceptNetworks": [
            "Visa",
            "MasterCard",
          ], // optional, default is ["Visa", "MasterCard", "JCB"]
          "appId": 11340, // replace with your Tappay App ID
          "appKey": "app_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // replace with your Tappay App Key
          "serverType": "sandbox", // optional, default is "sandbox". "production" is also available
        }
      ]
    ]
  }
}
```

# Usage
### Setup Merchant

This method configures the Apple Pay merchant information necessary before initiating payments. This setup must be completed before any Apple Pay transaction can be processed.

| Parameter | Type | Description |
|-----------|------|-------------|
| merchantName | string | Your merchant's display name that appears on the Apple Pay sheet |
| merchantCapability | string | Payment capabilities supported (e.g., "debit", "credit", "emv", "3DS") |
| merchantIdentifier | string | Your Apple Pay merchant identifier registered with Apple |
| countryCode | string | Two-letter ISO country code (e.g., "TW" for Taiwan) |
| currencyCode | string | Three-letter ISO currency code (e.g., "TWD" for New Taiwan Dollar) |

```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.setupMerchant(
  "YOUR_MERCHANT_NAME", // replace with your Merchant Name
  "MERCHANT_CAPABILITY", // replace with your Merchant Capability 
  "YOUR_MERCHANT_ID", // replace with your Merchant ID
  "TW", // replace with your Country Code
  "TWD", // replace with your Currency Code
)
```


### Checking Apple Pay Availability

Checks if Apple Pay is available and properly configured on the device

```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.isApplePayAvailable();
```

### Open Apple Pay Setup Screen

This method opens the Apple Pay setup screen.

```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.showSetup();
```

### Start Apple Pay

After using addItemToCart(), call startApplePay() to initiate the Apple Pay payment flow. 

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| cart | [CartItem](#CartItem)[] | Array of cart items to be processed for payment |

```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.startApplePay({
  cart: cartItems
});
```

### Show Result

You must use showResult function to display the result in the user interface.

**IMPORTANT: If showResult() is not called, the user interface will continue to show "Processing" and will not complete.**

Transaction result status (true = success, false = failure)



```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.showResult(boolean);
```

## Listener  
### Receive Prime Listener

[Event Type](#PrimeListener)

```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.addReceivePrimeListener((event) => {
  //  Handle the result of getting the prime, check if it is successful or failed
});
```

### Apple Pay Start Listener

[Payload Type](#GeneralEvent)

```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.addApplePayStartListener((payload) => {
  // Apple Pay transaction started
});
```

### Apple Pay Cancel Listener

[Payload Type](#GeneralEvent)

```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.addApplePayCancelListener((payload) => {
  // Apple Pay transaction cancel
});
```

### Apple Pay Finished Listener

[Payload Type](#GeneralEvent)
```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.addApplePayFinishedListener((payload) => {
  // Apple Pay transaction finished
});
```

### Apple Pay Success Listener

[Payload Type](#TransactionEvent)
```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.addApplePaySuccessListener((payload) => {
  // Apple Pay transaction successful
});
```

### Apple Pay Failed Listener

[Payload Type](#TransactionEvent)
```js
import ApplePay from "expo-tappay-apple-pay";

ApplePay.addApplePayFailedListener((payload) => {
  // Apple Pay transaction failed
});
```

### Remove Listener 
```js
import ApplePay from "expo-tappay-apple-pay";
import { EventSubscription } from "expo-modules-core";


const subscription: EventSubscription = ApplePay.addReceivePrimeListener((event) => {});

subscription.remove();
```

## Type
### <span id="CartItem">Cart Item Type</span>
| Key | Value | Description |
|-----|-------|-------------|
| name | `string` | Product name to display in Apple Pay sheet |
| amount | `number` | Product price in cents|


### <span id="PrimeListener">Receive Prime Listener Event Type</span>

- OnSuccessReceivePrimeEvent
  
| Key | Value | Description |
|-----|-------|-------------|
| success | `true` | Indicates the payment was successful |
| prime | `string` | The payment token generated by Tappay |
| expiryMillis | `number` | The expiration time of the payment token in milliseconds |
| totalAmount | `number` | The total amount of the payment |
| clientIP | `string` | The client's IP address |

- OnFailureReceivePrimeEvent

| Key | Value | Description |
|-----|-------|-------------|
| success | `false` | Indicates the payment failed |
| message | `string` | Error message describing the failure |

### <span id="GeneralEvent">Apple Pay General Event Payload Type</span>

| Key | Value | Description |
|-----|-------|-------------|
| status | `number` | The status code of the event |
| message | `string` | A message describing the event |


### <span id="TransactionEvent">Apple Pay Transaction Event Payload Type</span>

| Property | Type | Description |
|----------|------|-------------|
| status | number | Transaction status code |
| amount | number | Transaction amount |
| message | string | Transaction message |
| description | string | Detailed transaction description |
## Version
- TPDirect: v2.17.0