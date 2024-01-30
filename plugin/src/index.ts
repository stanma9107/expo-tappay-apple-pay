import {
  ConfigPlugin,
  withEntitlementsPlist,
  withInfoPlist,
} from "expo/config-plugins";

interface ConfigPayload {
  merchantId: string;
  acceptNetworks: "Visa" | "MasterCard" | "JCB" | "AmEx"[];
  appId: number;
  appKey: string;
  serverType: "sandbox" | "production";
}

const withApplePayEntitlement: ConfigPlugin<ConfigPayload> = (
  config,
  { merchantId, acceptNetworks, appId, appKey, serverType },
) => {
  config = withEntitlementsPlist(config, (config) => {
    console.log("Applying withApplePayEntitlement...");
    config.modResults["com.apple.developer.in-app-payments"] = [merchantId];

    return config;
  });

  config = withInfoPlist(config, (config) => {
    console.log("Applying withTappayConfig...");
    config.modResults["TPDApplePayPaymentNetworks"] = acceptNetworks;
    config.modResults["TPDAppId"] = appId;
    config.modResults["TPDAppKey"] = appKey;

    if (serverType !== "sandbox" && serverType !== "production") {
      throw new Error(
        "Invalid serverType. serverType must be either 'sandbox' or 'production'",
      );
    }

    config.modResults["TPDServerType"] = serverType;
    return config;
  });

  return config;
};

module.exports = withApplePayEntitlement;
