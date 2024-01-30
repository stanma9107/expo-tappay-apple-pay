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

## Usage
### Setup Merchant
```js
import { ApplePay } from "expo-tappay-apple-pay";

const applePayRef = useRef<ApplePay>();
applePayRef.current?.setupMerchant(
  "YOUR_MERCHANT_NAME", // replace with your Merchant Name
  "MERCHANT_CAPABILITY", // replace with your Merchant Capability (3DS, EMV, Credit, Debit)
  "YOUR_MERCHANT_ID", // replace with your Merchant ID
  "TW", // replace with your Country Code
  "TWD", // replace with your Currency Code
)
```

### Add Item to Cart
```js
import { ApplePay } from "expo-tappay-apple-pay";

const applePayRef = useRef<ApplePay>();

applePayRef.current?.addItemToCart({
  name: "Item Name", // replace with your Item Name
  amount: 100, // replace with your Item Amount
});
```

### Listen to Payment Event
```
import { ApplePay } from "expo-tappay-apple-pay";

return <ApplePay
  onApplePayStart={() => {
    console.log("onApplePayStart");
  }}
  onReceivePrime={(event) => {
    console.log("onReceivePrime", event);
  }}
  onApplePaySuccess={(event) => {
    console.log("onApplePaySuccess", event);
  }}
  onApplePayCancel={() => {
    console.log("onApplePayCancel");
  }}
  onApplePayFailed={(event) => {
    console.log("onApplePayFailed", event);
  }}
  onApplePayFinished={() => {
    console.log("onApplePayFinished");
  }}
/>
```

## Version
- TPDirect: v2.17.0