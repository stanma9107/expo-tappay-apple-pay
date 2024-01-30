import * as ExpoTappayApplePay from "expo-tappay-apple-pay";
import { useRef } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function App() {
  const applePay = useRef<ExpoTappayApplePay.ApplePay>(null);

  const setupMerchant = () => {
    applePay.current?.setupMerchant(
      "Halfway Studio",
      "3DS",
      "merchant.lava.hwstud.io",
      "TW",
      "TWD",
    );
  };

  const addItem = () => {
    applePay.current?.addItemToCart("test", 100);
  };

  return (
    <View style={styles.container}>
      <Button title="Setup Merchant" onPress={setupMerchant} />
      <Button title="Add Item" onPress={addItem} />
      <ExpoTappayApplePay.ApplePay
        ref={applePay}
        style={{
          width: "40%",
        }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
