import ExpoModulesCore

public class ExpoTappayApplePayModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
      
    View(ExpoTappayApplePayView.self) {
        Events("onApplePayStart")
        Events("onApplePayCancel")
        Events("onApplePaySuccess")
        Events("onReceivePrime")
        Events("onApplePayFailed")
        Events("onApplePayFinished")
        
        AsyncFunction("setupMerchant") { (view: ExpoTappayApplePayView, name: String, merchantCapability: String, merchantId: String, country: String, currency: String, promise: Promise) in
            view.setupMerchant(name: name, merchantCapability: merchantCapability, merchantId: merchantId, countryCode: country, currencyCode: currency)
        }
        
        AsyncFunction("addItemToCart") { (view: ExpoTappayApplePayView, name: String, amount: Int, promise: Promise) in
            view.addItemToCart(name: name, amount: amount)
        }
    }
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoTappayApplePay')` in JavaScript.
    Name("ExpoTappayApplePay")
  }
}
