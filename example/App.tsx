import applePay from "expo-tappay-apple-pay";
import { Button, StyleSheet, View } from "react-native";

export default function App() {
  applePay.addReceivePrimeListener((event) => {
    if (event.success) {
      applePay.showResult(true);
    }
  });

  const setupMerchant = () => {
    applePay.setupMerchant({
      name: "Tappay Test",
      capabilities: "3DS",
      merchantId: "merchant.tech.cherri.global.test",
      countryCode: "TW",
      currencyCode: "TWD",
    });
  };

  const showSetup = () => {
    applePay.showSetup();
  };

  const startPayment = () => {
    applePay.startApplePay({
      cart: [
        {
          name: "Test",
          amount: 100,
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Setup Merchant" onPress={setupMerchant} />
      <Button title="Show Setup" onPress={showSetup} />
      <Button title="Start Payment" onPress={startPayment} />
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
