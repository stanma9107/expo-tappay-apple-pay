import { ConfigPlugin, withEntitlementsPlist } from "expo/config-plugins";

const withApplePayEntitlement: ConfigPlugin<{
  merchantId: string;
}> = (config, { merchantId }) => {
  return withEntitlementsPlist(config, (config) => {
    console.log("Applying withApplePayEntitlement...");
    config.modResults["com.apple.developer.in-app-payments"] = [merchantId];

    return config;
  });
};

module.exports = withApplePayEntitlement;
