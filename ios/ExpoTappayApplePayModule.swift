import ExpoModulesCore
import TPDirect

let APPLE_PAY_START_EVENT_NAME = "onApplePayStart"
let APPLE_PAY_CANCEL_EVENT_NAME = "onApplePayCancel"
let APPLE_PAY_SUCCESS_EVENT_NAME = "onApplePaySuccess"
let APPLE_PAY_RECEIVE_PRIME_EVENT_NAME = "onReceivePrime"
let APPLE_PAY_FAILED_EVENT_NAME = "onApplePayFailed"
let APPLE_PAY_FINISH_EVENT_NANE = "onApplePayFinished"

public class ExpoTappayApplePayModule: Module  {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    Name("ExpoTappayApplePay")
      
    Events(APPLE_PAY_START_EVENT_NAME)
    Events(APPLE_PAY_CANCEL_EVENT_NAME)
    Events(APPLE_PAY_SUCCESS_EVENT_NAME)
    Events(APPLE_PAY_RECEIVE_PRIME_EVENT_NAME)
    Events(APPLE_PAY_FAILED_EVENT_NAME)
    Events(APPLE_PAY_FINISH_EVENT_NANE)
        
    var applePay: TPDApplePay!
    let merchant: TPDMerchant = TPDMerchant()
    let consumer: TPDConsumer = TPDConsumer()
    var cart: TPDCart = TPDCart()
    let networks = (Bundle.main.object(forInfoDictionaryKey: "TPDApplePayPaymentNetworks") as? [String] ?? ["Visa", "MasterCard", "JCB"]).map { PKPaymentNetwork(rawValue: $0) }
      
    // TODO: isApplePayAvailable to check canMakePayments
    Function("isApplePayAvailable") { () -> Bool in
        return TPDApplePay.canMakePayments()
    }
      
    // TODO: Setup Merchant in Payment
    Function("setupMerchant") { (name: String, merchantCapability: String, merchantId: String, countryCode: String, currencyCode: String) in
        merchant.merchantName = name
        
        // Merchant Capacility
        switch merchantCapability {
        case "debit":
            merchant.merchantCapability = .debit
        case "credit":
            merchant.merchantCapability = .credit
        case "emv":
            merchant.merchantCapability = .emv
        default:
            merchant.merchantCapability = .threeDSecure
        }
        
        // Merchant Identifier
        merchant.applePayMerchantIdentifier = merchantId
        
        // Country Code & Currency Code
        merchant.countryCode = countryCode
        merchant.currencyCode = currencyCode
        
        // Merchant Support Networks
        merchant.supportedNetworks = networks
    }
      
    // TODO: Clear Apple Pay Cart
    Function("clearCart") {
        cart = TPDCart()
    }
      
    // TODO: Add Items to Cart
    Function("addToCart") { (name: String, amount: Int) in
        let amountValue = NSDecimalNumber(value: amount)
        cart.add(TPDPaymentItem(itemName: name, withAmount: amountValue))
    }
      
    // TODO: Start Apple Pay Payment
    AsyncFunction("startPayment") { (promise: Promise) in
      // TODO: Prepare Payment
        let applePayDelegate = ApplePayDelegate() { (name: String, body: [String: Any?]) -> Void in
            debugPrint(name)
            self.sendEvent(name, body)
        }
      applePay = TPDApplePay.setupWthMerchant(merchant, with: consumer, with: cart, withDelegate: applePayDelegate)
        
      // TODO: Start Payment
      applePay.startPayment()
    }
      
    // TODO: Show Setup View
    Function("showSetup") {
      TPDApplePay.showSetupView()
    }
      
    // TODO: Show Payment Result
    Function("showResult") { (isSuccess: Bool) in
      applePay.showPaymentResult(isSuccess)
    }
  }
}
