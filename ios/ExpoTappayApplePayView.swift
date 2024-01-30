import ExpoModulesCore
import TPDirect

class ExpoTappayApplePayView: ExpoView {
    var applePay: TPDApplePay!
    var merchant: TPDMerchant = TPDMerchant()
    var consumer: TPDConsumer = TPDConsumer()
    var cart: TPDCart = TPDCart()
    var applePayButton: PKPaymentButton!
    let networks = (Bundle.main.object(forInfoDictionaryKey: "TPDApplePayPaymentNetworks") as? [String] ?? ["Visa", "MasterCard", "JCB"]).map { PKPaymentNetwork(rawValue: $0) }
    
    let onApplePayStart = EventDispatcher("onApplePayStart")
    let onApplePayCancel = EventDispatcher("onApplePayCancel")
    let onApplePaySuccess = EventDispatcher("onApplePaySuccess")
    let onReceivePrime = EventDispatcher("onReceivePrime")
    let onApplePayFailed = EventDispatcher("onApplePayFailed")
    let onApplePayFinished = EventDispatcher("onApplePayFinished")
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        
        // Init View
        if TPDApplePay.canMakePayments(usingNetworks: networks) {
            applePayButton = PKPaymentButton.init(paymentButtonType: .buy, paymentButtonStyle: .black)
        } else {
            applePayButton = PKPaymentButton.init(paymentButtonType: .setUp, paymentButtonStyle: .black)
        }
        
        addSubview(applePayButton)
        
        applePayButton.addTarget(self, action: #selector(didClickBuyButton), for: .touchUpInside )
    }
    
    func setupMerchant(name: String, merchantCapability: String, merchantId: String, countryCode: String, currencyCode: String) {
        // Merchant Name
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
    
    func addItemToCart(name: String, amount: Int) {
        let amountValue = NSDecimalNumber(value: amount)
        cart.add(TPDPaymentItem(itemName: name, withAmount: amountValue))
    }
    
    @objc func didClickBuyButton() {
        applePay = TPDApplePay.setupWthMerchant(merchant, with: consumer, with: cart, withDelegate: self)
        applePay.startPayment()
    }
    
    override func layoutSubviews() {
        applePayButton.frame = bounds
    }
}

extension ExpoTappayApplePayView: TPDApplePayDelegate {
    func tpdApplePayDidStartPayment(_ applePay: TPDApplePay!) {
        onApplePayStart()
      }
    
    func tpdApplePay(_ applePay: TPDApplePay!, didReceivePrime prime: String!, withExpiryMillis expiryMillis: Int, with cardInfo: TPDCardInfo!, withMerchantReferenceInfo merchantReferenceInfo: [AnyHashable : Any]!) {
        // If Payment Success, applePay.
        let paymentResult = true;
        applePay.showPaymentResult(paymentResult)
        
        onReceivePrime([
            "prime": prime!,
            "expiryMillis": expiryMillis,
            "totalAmount": applePay.cart.totalAmount?.doubleValue ?? 0,
            "clientIP": applePay.consumer.clientIP!
        ])
    }
    
    func tpdApplePay(_ applePay: TPDApplePay!, didSuccessPayment result: TPDTransactionResult!) {
        onApplePaySuccess([
            "totalAmount": result.amount.doubleValue
        ])
    }
    
    func tpdApplePay(_ applePay: TPDApplePay!, didFailurePayment result: TPDTransactionResult!) {
        onApplePayFailed([
            "message": result.message ?? "",
            "code": result.status
        ])
    }
    
    func tpdApplePayDidCancelPayment(_ applePay: TPDApplePay!) {
        onApplePayCancel()
    }
    
    func tpdApplePayDidFinishPayment(_ applePay: TPDApplePay!) {
        onApplePayFinished()
    }
}
