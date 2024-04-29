import ExpoModulesCore
import PhotosUI
import TPDirect

public protocol TPDApplePayDelegate : NSObjectProtocol {
  // Send To The Delegate After Receive Prime.
    func tpdApplePay(_ applePay: TPDApplePay!, didReceivePrime prime: String!, withExpiryMillis expiryMillis: Int, withCardInfo cardInfo: TPDCardInfo, withMerchantReferenceInfo merchantReferenceInfo: [AnyHashable : Any]!)

  // Send To The Delegate After Apple Pay Payment Processing Succeeds.
    func tpdApplePay(_ applePay: TPDApplePay!, didSuccessPayment result: TPDTransactionResult!)

  // Send To The Delegate After Apple Pay Payment Processing Fails.
    func tpdApplePay(_ applePay: TPDApplePay!, didFailurePayment result: TPDTransactionResult!)

  // Send To The Delegate After Apple Pay Payment's Form Is Shown.
    func tpdApplePayDidStartPayment(_ applePay: TPDApplePay!)

  // Send To The Delegate After User Selects A Payment Method.
  // You Can Change The PaymentItem Or Discount Here.
  @available(iOS 9.0, *)
    func tpdApplePay(_ applePay: TPDApplePay!, didSelect paymentMethod: PKPaymentMethod!, cart: TPDCart!) -> TPDCart!

  // Send To The Delegate After User Selects A Shipping Method.
  // Set shippingMethods ==> TPDMerchant.shippingMethods.
  @available(iOS 8.0, *)
    func tpdApplePay(_ applePay: TPDApplePay!, didSelect shippingMethod: PKShippingMethod!)

  // Send To The Delegate After User Authorizes The Payment.
  // You Can Check Shipping Contact Here, Return YES If Authorized.
  @available(iOS 9.0, *)
    func tpdApplePay(_ applePay: TPDApplePay!, canAuthorizePaymentWithShippingContact shippingContact: PKContact!) -> Bool

  // Send To The Delegate After User Cancels The Payment.
    func tpdApplePayDidCancelPayment(_ applePay: TPDApplePay!)

  // Send To The Delegate After Apple Pay Payment's Form Disappeared.
    func tpdApplePayDidFinishPayment(_ applePay: TPDApplePay!)
}


public class ExpoTappayApplePayModule: Module, TPDApplePayDelegate  {
    
    
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
